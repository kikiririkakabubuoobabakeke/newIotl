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
                let writevalue = "hello,world";
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