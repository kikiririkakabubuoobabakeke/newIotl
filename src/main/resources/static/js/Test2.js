let serviceid = BluetoothUUID.canonicalUUID(0x000a); 
var charaid = BluetoothUUID.canonicalUUID(0x000b); 

var setdevice;
var setservice;
var setserver;
var setchara;

var scanButton = document.getElementById('scanBtn');
var scanButton2 = document.getElementById('scanBtn2');

scanButton.addEventListener('click', async () => {
	
     await navigator.bluetooth.requestDevice({
        filters: [{
            services: [serviceid],
        }],
        optionalServices: [serviceid] 
    })
	
    .then(async (device) => {
        setdevice = device;
        await setdevice.addEventListener('gattserverdisconnected', disconnect);
        console.log("接続成功: " + setdevice.name);
        console.log("id  " + setdevice.id);
        return device.gatt.connect();
    })
    .then(server => {
		console.log("connecte  " + setdevice.gatt.connected);
        setserver = server;
        return server.getPrimaryService(serviceid);
    })
    .then(service => {
        setservice = service;
        return service.getCharacteristic(charaid);
    })
    .then(characteristic => {
        setchara = characteristic;
        console.log("characteristic: " + setchara.uuid);
		
    })
    .catch(error => {
        console.log("接続に失敗しました");
        console.log(error);
    });
});

scanButton2.addEventListener('click', async () => {
	text = textInput.value; console.log("フォームの内容: " + text);
    try {
        if (setdevice.gatt.connected) {
            console.log("connected");
            var characteristic = await setservice.getCharacteristic(charaid);
            vchara = characteristic;

            try {
                var response = await vchara.readValue();
                var readvalue = new TextDecoder('utf-8').decode(response);
                console.log("ペリフェラル機器によってWriteされました: " + readvalue);
            } catch (error) {
                console.log("データの読み込みに失敗しました");
                console.log(error);
            }
			
            try {
                let writevalue = text;
                let encoder = new TextEncoder();
                let arrayBuffer = encoder.encode(writevalue);
                await vchara.writeValue(arrayBuffer);
                console.log("Writeを行いました");
            } catch (error) {
                console.log("Writeに失敗しました");
                console.log(error);
            }
        } else {
            console.log("not connect");
        }
    } catch (exceptionVar) {
        console.log("エラー:" + exceptionVar);
    }
});

/*
scanButton2.addEventListener('click', () => {
    try {
        if (setdevice.gatt.connected) {
            console.log("connected");
			setservice.getCharacteristic(charaid)
				.then(characteristic => {
					vchara = characteristic;
					vchara.readValue()
						.then(response => {
							let readvalue = new TextDecoder('utf-8').decode(response);
							console.log("Read:"+readvalue);
						})
						.catch(error => {
							console.log("データの読み込みに失敗しました");
							console.log(error);
						})
				})
			setservice.getCharacteristic(charaid)
				.then(characteristic => {
					vchara = characteristic;
					let writevalue = "hello,world";
					let encoder = new TextEncoder();
					let arrayBuffer = encoder.encode(writevalue);
					vchara.writeValue(arrayBuffer);
				})
			} else {
            console.log("not connect");
        }
    } catch (exceptionVar) {
        console.log("エラー:"+exceptionVar);
    }
});
*/
const disconnect = () => {
    console.log("接続終了");
};






/*一時的にここから
let serviceid = BluetoothUUID.canonicalUUID(0x000a);
let charaid = BluetoothUUID.canonicalUUID(0x000b); 
let setdevice;
let setservice;
let setserver;
let setchara;




const scanButton = document.getElementById('scanBtn');
const scanButton2 = document.getElementById('scanBtn2');

scanButton.addEventListener('click', () => {
        
	navigator.bluetooth.requestDevice({
		filters: [{
         services: [serviceid],
		}],
		optionalServices: [serviceid,charaid],
	})
  
	.then(device => {
    	setdevice = device;
        setdevice.addEventListener('gattserverdisconnected', disconnect);
        console.log("接続成功: "+setdevice.name);
		console.log("id  "+setdevice.id);
		console.log("connecte  "+setdevice.gatt.connected);
        return device.gatt.connect();
	})
	.then(server => {
		setserver = server;
		console.log(1);
		return server.getPrimaryService(charaid);
	})
	ここまで*/
	
/*
	.then(service => {
		setservice = service;
		console.log(2);
		return service.getCharacteristic();
	})

	.then(characteristic => {
	    // characteristicに対してRead/Write/Notificationsの処理を記述
	})
*/


/*一時的ここから
	.catch(error => {
		console.log("接続に失敗しました")
		console.log(error);
	});
});

	
scanButton2.addEventListener('click', () => {
	try{
		if(setdevice.gatt.connected){
			console.log("connected");	
		}else{
			console.log("not connect");
		}		
	}catch(exceptionVar) {
		  console.log("エラー")
	}
});
	
const disconnect = () => {
	console.log("接続終了");
};
　ここまで			*/
