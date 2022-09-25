const newDoctorurl = 'https://db-hospital-c3g53.herokuapp.com/newdoctor'

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

    const dnid = document.registro.id.value;
    const dFirstname = document.registro.firstname.value;
    const dLastname  = document.registro.lastname.value;
    const dPhoneNumber = document.registro.phonenumber.value;
    const dgender = document.registro.gender.value;
    const dspecialty = document.registro.especialidad.value;
    const dresgister = document.registro.register.value;

    let result = validar_nombre_apellido(dFirstname);
    if (!result) {
        alert('Nombre no válido');
        return;
    }
    result = validar_nombre_apellido(dLastname);
    if (!result) {
        alert('Apellido no válido');
        return;
    }
 
    
    const customer ={
        dnid : dnid,
        dFirstname : dFirstname,
        dLastname :dLastname,
        dPhoneNumber : dPhoneNumber,
        dgender :dgender,
        dspecialty : dspecialty,
        dresgister :dresgister
    
    }
    /*
    alert(`Usuario registrado con los siguientes datos:
        ${customer.patientfirstname} ${customer.patientlastname} ${customer.patientid}`);*/
    console.log(customer);
    const dataToSend = JSON.stringify(customer);
    sendData(dataToSend);
}

function sendData(data) {
    fetch(newDoctorurl, {
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
    message.innerHTML = "Doctor creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerHTML = "No se pudo crear el Doctor. Intente luego.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

document.registro.addEventListener('submit', Collectdata);