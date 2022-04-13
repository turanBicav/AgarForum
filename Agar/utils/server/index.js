var fcm = require('fcm-notification');
var FCM = new fcm('./agar-19174-firebase-admin.json');
var token = "ct2UIWo9RSKUNwg5UbdE3h:APA91bFlXTnAwZ_a74Ws0QZzX3ET53HcKKYGDICCd2qsWEiCgBQ4Y9OoRE--K-FjLvZm_MecLMeNdiK63iDzPLYJ1qp6Dhznmn_vujTCEeXR2Lh6P--ft1R2Nz6-kklwesc8NS7Uwq_q";
var admin = require('firebase-admin');



    var message = {
        notification:{
            title : 'Turan',
            body : 'Bicav'
        },
        token : token
        };
 
FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
