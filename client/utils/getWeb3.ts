import Web3 from 'web3';

const getWeb3 = (): Promise<Web3> => {
  return new Promise((resolve, reject) => {
    // الانتظار حتى يتم تحميل الصفحة لتجنب مشاكل التزامن مع توقيت حقن web3.
    window.addEventListener('load', async () => {
      // متصفحات dapp الحديثة...
      if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);
        try {
          // طلب الوصول إلى الحسابات إذا لزم الأمر
          await (window as any).ethereum.enable();
          // الحسابات الآن مكشوفة
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // المتصفحات القديمة
      else if ((window as any).web3) {
        // استخدام مزود Mist/MetaMask.
        const web3 = (window as any).web3;
        console.log('injected web3 detected');
        resolve(web3);
      }
      // العودة إلى localhost؛ استخدام منفذ وحدة التحكم التطويرية بشكل افتراضي
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        const web3 = new Web3(provider);
        console.log('لا يوجد مثيل web3 محقون، يتم استخدام web3 المحلي.');
        resolve(web3);
      }
    });
  });
};

export default getWeb3;