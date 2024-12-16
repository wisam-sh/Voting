// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Election {
    // هيكل بيانات للمرشح
    struct Candidate {
        string name;          // اسم المرشح
        string description;   // وصف المرشح
        string imageURL;     // رابط صورة المرشح
        uint voteCount;      // عدد الأصوات التي حصل عليها المرشح
    }

    // هيكل بيانات لإدارة الانتخابات
    struct ElectionDetails {
        string title;          // عنوان الانتخابات
        uint startTime;        // توقيت بدء الانتخابات
        uint endTime;          // توقيت انتهاء الانتخابات
        bool isPaused;         // حالة إيقاف الانتخابات
        mapping(address => bool) hasVoted; // خريطة لتتبع من صوت
        mapping(uint => Candidate) candidates; // خريطة لتخزين المرشحين باستخدام معرف فريد
        uint candidateCount;   // عدد المرشحين
    }

    mapping(uint => ElectionDetails) public elections; // خريطة لتخزين الانتخابات بالاعتماد على معرفها
    uint public electionCount; // عداد الانتخابات
    address public admin; // عنوان المسؤول الذي يدير الانتخابات

    event ElectionCreated(uint electionId, string title); // حدث يتم إطلاقه عند إنشاء انتخابات
    event VoteCast(uint electionId, uint candidateId); // حدث يتم إطلاقه عند التصويت
    event CandidateAdded(uint electionId, uint candidateId); // حدث يتم إطلاقه عند إضافة مرشح

    // تعديل للوصول إلى الوظائف فقط من قبل المسؤول
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action."); // التحقق من هوية المسؤول
        _;
    }

    // تعديل للوصول إلى الوظائف فقط أثناء فترة الانتخابات
    modifier onlyDuringElection(uint electionId) {
        require(block.timestamp >= elections[electionId].startTime && block.timestamp <= elections[electionId].endTime, "Election is not active."); // التحقق من توقيت الانتخابات
        require(!elections[electionId].isPaused, "Election is paused."); // التحقق من حالة الانتخابات
        _;
    }

    // تعيين المسؤول عند نشر العقد
    constructor() {
        admin = msg.sender; // تعيين عنوان الشخص الذي نشر العقد كمسؤول
    }

    // وظيفة لإنشاء انتخابات جديدة
    function createElection(string memory title, uint startTime, uint endTime) public onlyAdmin {
        require(startTime < endTime, "Invalid time range."); // التحقق من أن توقيت البدء أصغر من توقيت الانتهاء
        ElectionDetails storage newElection = elections[electionCount++]; // إنشاء انتخابات جديدة وتخزينها
        newElection.title = title; // تعيين عنوان الانتخابات
        newElection.startTime = startTime; // تعيين توقيت البدء
        newElection.endTime = endTime; // تعيين توقيت الانتهاء
        newElection.isPaused = false; // تعيين حالة الانتخابات كغير متوقفة

        emit ElectionCreated(electionCount - 1, title); // إطلاق حدث إنشاء الانتخابات
    }

    // وظيفة لإضافة مرشح جديد إلى انتخابات معينة
    function addCandidate(uint electionId, uint candidateId, string memory name, string memory description, string memory imageURL) public onlyAdmin {
        require(block.timestamp < elections[electionId].startTime, "Cannot add candidates after the election has started."); // التحقق من أن الوقت الحالي أقل من وقت بدء الانتخابات
        elections[electionId].candidates[candidateId] = Candidate(name, description, imageURL, 0); // إضافة مرشح جديد إلى الخريطة
        elections[electionId].candidateCount++; // زيادة عدد المرشحين

        emit CandidateAdded(electionId, candidateId); // إطلاق حدث إضافة المرشح
    }

    // وظيفة للتصويت لمرشح معين في انتخابات محددة
    function vote(uint electionId, uint candidateId) public onlyDuringElection(electionId) {
        ElectionDetails storage election = elections[electionId]; // الحصول على انتخابات معينة
        require(!election.hasVoted[msg.sender], "You've already voted."); // التحقق من أن الناخب لم يصوت مسبقاً

        election.candidates[candidateId].voteCount++; // زيادة عدد الأصوات للمرشح
        election.hasVoted[msg.sender] = true; // تعيين أن الناخب قد صوت

        emit VoteCast(electionId, candidateId); // إطلاق حدث التصويت
    }

    // وظيفة لإيقاف انتخابات معينة
    function pauseElection(uint electionId) public onlyAdmin {
        elections[electionId].isPaused = true; // تعيين حالة الانتخابات على متوقفة
    }

    // وظيفة لاستئناف انتخابات معينة
    function resumeElection(uint electionId) public onlyAdmin {
        elections[electionId].isPaused = false; // تعيين حالة الانتخابات على غير متوقفة
    }

    // وظيفة للحصول على نتائج انتخابات معينة
    function getElectionResults(uint electionId) public view returns (Candidate[] memory) {
        Candidate[] memory results = new Candidate[](elections[electionId].candidateCount);
        for (uint i = 0; i < elections[electionId].candidateCount; i++) {
            results[i] = elections[electionId].candidates[i]; // نسخ المرشحين إلى مصفوفة جديدة
        }
        return results; // إرجاع قائمة المرشحين ونتائجهم
    }
}