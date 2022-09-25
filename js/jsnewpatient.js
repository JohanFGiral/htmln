const newCustomerUrl = 'https://db-hospital-c3g53.herokuapp.com/newpatient';

function validar_nombre_apellido(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters)){
        return true;
    }else{
        return false;
    }
}


function validar_contrasena(val) {
    if (val.length >= 5)
        return true;
    else
        return false;
}

function Collectdata(evt){
    evt.preventDefault();

    const patientid = document.registro.id.value;
    const patientfirstname = document.registro.firstname.value;
    const patientlastname  = document.registro.lastname.value;
    const patientphonenumber = document.registro.phonenumber.value;
    const patientgender = document.registro.gender.value;
    const patientaddress = document.registro.address.value;
    const patientcity = document.registro.city.value;
    const patientBirthday = document.registro.Birthday.value;
    const patientLongitude = document.registro.longitude.value;
    const patientLatitude = document.registro.latitude.value;

    let result = validar_nombre_apellido(patientfirstname);
    if (!result) {
        alert('Nombre no válido');
        return;
    }
    result = validar_nombre_apellido(patientlastname);
    if (!result) {
        alert('Apellido no válido');
        return;
    }
 
    
    const customer ={
        patientid : patientid,
        patientfirstname : patientfirstname,
        patientlastname :patientlastname,
        patientphonenumber : patientphonenumber,
        patientgender :patientgender,
        patientaddress : patientaddress,
        patientcity :patientcity,
        patientBirthday :patientBirthday,
        patientLatitude:patientLatitude,
        patientLongitude:patientLongitude
    
    }
    /*
    alert(`Usuario registrado con los siguientes datos:
        ${customer.patientfirstname} ${customer.patientlastname} ${customer.patientid}`);*/
    console.log(customer);
    const dataToSend = JSON.stringify(customer);
    sendData(dataToSend);
}

function sendData(data) {
    fetch(newCustomerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            if (response.ok) {
                return response.text()
            } else {
                throw new Error(response.status)
            }
        })
        .then(data => {
            console.log(data);
            handleSuccess();
        })
        .catch(err => {
            console.log("Error: " + err);
            handleError();
        });
}

function handleSuccess() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerHTML = "paciente creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerHTML = "No se pudo crear el paciente. Intente luego.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

document.registro.addEventListener('submit', Collectdata);