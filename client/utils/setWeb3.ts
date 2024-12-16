import Web3 from 'web3';

const setWeb3 = async (setWeb3State: React.Dispatch<React.SetStateAction<Web3 | null>>) => {
    return new Promise<Web3>((resolve, reject) => {
        window.addEventListener('load', async () => {
            // متصفحات dapp الحديثة...
            if ((window as any).ethereum) {
                const web3 = new Web3((window as any).ethereum);
                try {
                    // طلب الوصول إلى الحسابات إذا لزم الأمر
                    await (window as any).ethereum.enable();
                    // الحسابات الآن مكشوفة
                    setWeb3State(web3); // تحديث الحالة هنا
                    resolve(web3);
                } catch (error) {
                    reject(error);
                }
            }
            // متصفحات dapp القديمة...
            else if ((window as any).web3) {
                // استخدام مزود Mist/MetaMask.
                const web3 = (window as any).web3;
                console.log('تم الكشف عن web3 المحقون.');
                setWeb3State(web3); // تحديث الحالة هنا
                resolve(web3);
            }
            // العودة إلى localhost؛ استخدام منفذ وحدة التحكم التطويرية بشكل افتراضي...
            else {
                const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
                const web3 = new Web3(provider);
                console.log('لا يوجد مثيل web3 محقون، يتم استخدام web3 المحلي.');
                setWeb3State(web3); // تحديث الحالة هنا
                resolve(web3);
            }
        });
    });
};

export default setWeb3; 