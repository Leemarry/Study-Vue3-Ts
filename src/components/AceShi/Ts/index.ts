
//# region 惰性检查函数
// let userType: 'VIP' | '普通用户' | undefined; // 将userType移出立即执行函数表达式(IIFE)，使其可在外部访问  

//   // 假设的getUserType函数，现在它只是一个getter  
//   function getUserType(): 'VIP' | '普通用户' | undefined {  
//     return userType;  
//   }  

//   // 设置用户类型的函数  
//   function setUserType(newType: 'VIP' | '普通用户') {  
//     userType = newType;  
//   }  

//   // 惰性检查函数  
//   const getUserOperations = (() => {  
//     let lastCheckedType: 'VIP' | '普通用户' | undefined; // 用来缓存上一次检查的用户类型  

//     const executeOperations = () => {  


//       const currentType = getUserType(); // 总是获取最新的用户类型  
//       console.log('检查用户类型...',lastCheckedType,'总是获取最新的用户类型',currentType);
//       if (lastCheckedType !== currentType) {  
//         // 如果用户类型发生了变化，则更新缓存并重新执行操作  
//         lastCheckedType = currentType;  

//         if (currentType === 'VIP') {  
//           console.log('执行VIP用户的专属操作...');  
//           // 这里可以添加VIP用户的专属操作  
//         } else if (currentType === '普通用户') {  
//           console.log('执行普通用户的操作...');  
//           // 这里可以添加普通用户的操作  
//         } else {  
//           console.error('无法确定用户类型');  
//         }  
//       }  
//       // 如果没有变化，则不执行任何操作（或者你可以在这里添加一些其他逻辑）  
//     };  

//     return () => {  
//       executeOperations();  
//     };  
//   })();  

//   // 初始用户类型为普通用户  
//   setUserType('普通用户');  

//   // 模拟用户充值成为VIP  
//   setTimeout(() => {  
//     setUserType('VIP');  
//     getUserOperations(); // 这将执行VIP用户的专属操作  
//   }, 5000);  

//   // 首次调用（此时用户为普通用户）  
//   getUserOperations(); // 执行普通用户的操作  
//   getUserOperations(); // 执行普通用户的操作  

//   // 再次调用（在模拟充值后），将执行VIP用户的操作  
//   // 注意：这里的再次调用是通过setTimeout模拟的，以模拟用户状态的变化

// #endregion 惰性检查函数



let userType: 'VIP' | '普通用户' | undefined; // 将userType移出立即执行函数表达式(IIFE)，使其可在外部访问  

// 假设的getUserType函数，现在它只是一个getter  
function getUserType(): 'VIP' | '普通用户' | undefined {
    return userType;
}



// 惰性检查函数  
const getUserOperations = ((newType) => {
    let lastCheckedType: 'VIP' | '普通用户' | undefined; // 用来缓存上一次检查的用户类型  


    // 设置用户类型的函数  
    function setUserType(newType: 'VIP' | '普通用户') {
        lastCheckedType = newType;
    }
    const executeOperations = (newType:any) => {


        const currentType = getUserType(); // 总是获取最新的用户类型  
        console.log('检查用户类型...', lastCheckedType, '总是获取最新的用户类型', currentType);
        if (lastCheckedType !== currentType) {
            // 如果用户类型发生了变化，则更新缓存并重新执行操作  
            lastCheckedType = currentType;

            if (currentType === 'VIP') {
                console.log('执行VIP用户的专属操作...');
                // 这里可以添加VIP用户的专属操作  
            } else if (currentType === '普通用户') {
                console.log('执行普通用户的操作...');
                // 这里可以添加普通用户的操作  
            } else {
                console.error('无法确定用户类型');
            }
        }
        // 如果没有变化，则不执行任何操作（或者你可以在这里添加一些其他逻辑）  
    };

    return (newType:any) => {
        if (!newType) {
           setUserType(newType)
        }
        executeOperations(newType);
    };
})();

// 初始用户类型为普通用户  
getUserOperations('普通用户');

// 模拟用户充值成为VIP  
setTimeout(() => {
    setUserType('VIP');
    getUserOperations(); // 这将执行VIP用户的专属操作  
}, 5000);

// 首次调用（此时用户为普通用户）  
getUserOperations(); // 执行普通用户的操作  
getUserOperations(); // 执行普通用户的操作  

// 再次调用（在模拟充值后），将执行VIP用户的操作  
// 注意：这里的再次调用是通过setTimeout模拟的，以模拟用户状态的变化
