function gettest(){

document.getElementById("test1ht").innerHTML = "げっとえれめんと!!";
}

function createtest(){
	
  var test = document.createElement('div');
 	test.id='test';
	test.innerHTML="くりえいとえれめんと!!";
  var test2 = document.getElementById('test2ht');
  test2.appendChild(test);
}


let picoid = 0x000a;

let setdevice;
let setservice;
let setserver;
let setchara;

document.addEventListener('DOMContentLoaded', (event) => {
    const scanButton = document.getElementById('scanBtn');
    scanButton.addEventListener('click', () => {
        
        navigator.bluetooth.requestDevice({
            filters: [{
                services: [picoid]
            }]
        })
        
        .then(device => {
            setdevice = device;
            setdevice.addEventListener('gattserverdisconnected', disconnect);
            console.log("接続成功: "+setdevice.name);
            return setdevice.gatt.connect();
        })
        /*
        .then(server => {
            setserver = server;
            return setserver.getPrimaryService(picoid);
        })
        
        .then(service => {
            setservice = service;
            return setservice.getCharacteristic(CharacteristicUUID_Notification);
        })
        
       
        .then(characteristic => {
        	setchara = characteristic;
        })
        */
        .catch(error => {
			console.log("接続に失敗しました")
            console.log(error);
   	
   	  
			
		
        });
    });
});

const disconnect = () => {
    console.log("接続終了");
};
