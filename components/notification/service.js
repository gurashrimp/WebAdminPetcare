// var admin = require ("firebase-admin");
// var serviceAccount= require ("../../fptl-4872d-firebase-adminsdk-3a04o-5b1d00bc9c.json");
// function PushNotifier(){
//     var defaultAppConfig = {
//         credential: provider.credential.cert(serviceAccount),
//     databaseURL: "https://fptl-4872d-default-rtdb.asia-southeast1.firebasedatabase.app"
//     }
//     admin.initializeApp(defaultAppConfig);
// };
// PushNotifier.prototype.sendNotificationToDeviceIOS = function(data){
//     let android = {
//         priority: "High", //mức độ ưu tiên khi push notification
//         ttl: '360000',// hết hạn trong 1h
//         data: {
//           title: 'Testing',
//           content: 'Chạy thử'
//         }
//     }
    
//     let message = {
//         android: android,
//         token: tokenDevice // token của thiết bị muốn push notification
//     }
//     fireabse.messaging().send(message)
//     .then((response) => {
//         // Response is a message ID string.
//     })
//     .catch((error) => {
//         //return error
//     });
//   }