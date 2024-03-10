

//EMPLOYEES PAGE
let ellipsisBtn =document.getElementById("ellipsis")
let optionBox = document.getElementById("optionBox")
let addEmployeeOpenBtn = document.getElementById("addEmployeeOpen")
let tableInp = document.getElementById("table-body")
let overlayEl = document.getElementById("overlay")
let addEmployeeForm = document.getElementById("addEmployeeId")
let employeeList = document.getElementById("employeeList")
let modalEl = document.getElementById("modal")
let modalMsg = document.getElementById("successMessage")
let allEmployees;  // globally assigned all employees for Search Operation
let actionButton; // assign optionBox div into it

//BUTTONS AND FUNCTIONS
    addEmployeeOpenBtn.addEventListener("click",async function(){
        console.log('button clicked');
        addEmployeeForm.style.display = "block"
        overlayEl.style.display = "block"
    })

const optionBoxEl = (actions)=>{
    actions.classList.toggle("pops");
    overlayOptionBox.style.display = "block"
    setTimeout(()=>{ actionButton = actions },500)
    if(actionButton) {
        actionButton.classList.remove("pops")  
}
}
    // HIDE FORMS WWHEN CLICK OVERLAY
    overlayEl.addEventListener("click",async function(){
        overlayEl.style.display="none"

        // add employee form hide
            addEmployeeForm.classList.replace('fadeIn', 'fadeOut')
            await setTimeout(()=>{
                addEmployeeForm.style.display="none"},100)
            setTimeout(()=>{
                addEmployeeForm.classList.replace('fadeOut', 'fadeIn');
            },1500)

        // edit employee form hide
            editEmployeeForm.classList.replace('fadeIn', 'fadeOut')
            await setTimeout(()=>{
                editEmployeeForm.style.display="none"},100)
            setTimeout(()=>{
                editEmployeeForm.classList.replace('fadeOut', 'fadeIn');
            },1500)

        // delete employee form hide
            deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
            setTimeout(()=>{
                deleteEmployeeFormEl.style.display="none"},100)
            setTimeout(()=>{
                deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn');
            },1500)
    })
        // END HIDE FORMS WWHEN CLICK OVERLAY
//END EMPLOYEE PAGE

// DISPLAY EMPLOYEES IN TABLE BODY
function displayEmployees(value,sl){
    let tableData= ""
    value.map((value,index)=>{
    tableData += `<tr>
    <td>#${salZero(sl+index)}${sl+index}</td>
    <td>${value.salutation}${value.firstname} ${value.lastname}</td>
    <td>${value.email}</td>
    <td>${value.phone}</td>
    <td>${value.gender}</td>
    <td>${removeTimeFromDOB(value.dob)}</td>
    <td>${value.country}</td>
    <td>
        <button onclick="optionBoxEl(this.nextElementSibling)" class="ellipsis-div" ><i _id="ellipsis" class="fa-solid fa-ellipsis ellipsis"></i></button>
        <div _id="optionBox${index}" class="optionBox">
            <a href="/employeeDetails?id=${value._id}" target="blank"><button onclick="viewDetails('${value._id}')" class="optionBoxBtn"><span class="material-symbols-outlined">visibility</span><p>View Details</p></button></a>
            <button onclick="editDetails('${value._id}'); " class="optionBoxBtn"><span class="material-symbols-outlined">edit</span><p>Edit</p></button>
            <button onclick="deleteDetails('${value._id}')" class="optionBoxBtn"><span class="material-symbols-outlined">delete</span><p>Delete </p></button>
        </div>
    </td>
    </tr>`
    // First number of SL
    function salZero(slno) {
        return slno < 10 ? 0 : "";
    }
    function removeTimeFromDOB(birthdate){
    let array = []
    let date = birthdate.split('T')
    array.push(date[0].split('-').reverse().join('-'))
    return array[0]
  }
    //END first number of SL
    })
    tableInp.innerHTML = tableData;
}
//END DISPLAY EMPLOYEES IN TABLE BODY

// GET ALL DEFAULT EMPLOYEES
async function allUserData(){
    try{
        const response = await fetch("http://localhost:4000/employees")
        const objectData = await response.json();
        // console.log(objectData);
        pagination(objectData)
        allEmployees = objectData;
    }catch (error){
        // console.error("Error fetching data:", error);
}}
allUserData()
// END GET ALL DEFAULT EMPLOYEES

// SEARCH OPERATION
// document.getElementById("search").innerText = ""
const searchEmployee = () => {
console.log(document.getElementById("search").value);
const searchInput = document.getElementById("search").value.toUpperCase();
let filteredEmployees = [];
for(let i=0; i<allEmployees.length;i++){
    let firstName = allEmployees[i].firstName.toUpperCase();
    let phone =  allEmployees[i].phone;
    let mail =  allEmployees[i].email.toUpperCase();

    if(firstName.includes(searchInput)||phone.includes(searchInput)||mail.includes(searchInput)){
        filteredEmployees.push(allEmployees[i])
    }
}
pagination(filteredEmployees)
}
//END SEARCH OPERATION

// DOB REVERSING FUNCTION
function dob(birthDay){
let date = birthDay.split('-').reverse().join('-');
return date;
}
//END DOB REVERSING FUNCTION

// POST AVATAR
function uploadAvatar(id,employeeAvatar){
    let avatarData = new FormData()
    avatarData.append("avatar",employeeAvatar)
    try{
    const res = fetch("http://localhost:4000/employees/"+id+"/avatar",{
        method: "POST",
        body : avatarData
    })}catch(error){
        console.log(error);
}}
// END POST AVATAR

// ADD EMPLOYEE FORM 
let salutationEl = document.getElementById("salutation").value
let firstNameEl = document.getElementById("firstName").value
let lastNameEl = document.getElementById("lastName").value
let emailEl = document.getElementById("email").value
let phoneEl = document.getElementById("phone").value
let dobEl = document.getElementById("dob").value
let maleEl = document.getElementById("male").value
let femaleEl = document.getElementById("female").value
let qualificationsEl = document.getElementById("qualifications").value
let addressEl = document.getElementById("address").value
let cityEl = document.getElementById("city").value
let stateEl = document.getElementById("state").value
let countryEl = document.getElementById("country").value
let usernameEl =document.getElementById("username").value
let passwordEl =document.getElementById("password").value
// let pinZipEl = document.getElementById("pinzip").value
let addEmployeeDiv = document.getElementById("addEmployeeFormUpload")
let addEmployeePreview = document.getElementById("addEmployeeFormPrev")
let addEmployeeChangeDpBtn = document.getElementsByClassName("addEmployeeChangedp")
let addEmployeeAvatar 
let addEmployeeDp = document.getElementById("addEmployeeDp")

    // BUTTONS AND ITS FUNCTIONS
        let addEmployeeCloseBtn = document.getElementById("addEmployeeClose")
        let addEmployeeCancelBtn = document.getElementById("addEmployeeCancel")
        let addEmployeeAddBtn = document.getElementById("addEmployeeAdd")
        let addEmployeeAvatarInput = document.getElementById("upload")

        addEmployeeAvatarInput.addEventListener('change' , () => { //avatar input
            addEmployeeAvatar = addEmployeeAvatarInput.files[0];
            addFormImagePreview()
        })
        addEmployeeCloseBtn.addEventListener("click",function(){
            addEmployeeForm.classList.replace('fadeIn', 'fadeOut')
             setTimeout(()=>{
                addEmployeeForm.style.display="none"},100)
            setTimeout(()=>{
                addEmployeeForm.classList.replace('fadeOut', 'fadeIn');
            },1500)
            overlayEl.style.display = "none"
        })
        addEmployeeCancelBtn.addEventListener("click",function(){
            addEmployeeForm.classList.replace('fadeIn', 'fadeOut')
             setTimeout(()=>{
                addEmployeeForm.style.display="none"},100)
            setTimeout(()=>{
                addEmployeeForm.classList.replace('fadeOut', 'fadeIn');
            },1500)
            overlayEl.style.display = "none"
        })
    //END BUTTONS AND ITS FUNCTIONS

// AVATAR PREVIEW
    function addFormImagePreview(){
        const [file] = addEmployeeAvatarInput.files
        if (file) {
            addEmployeeDiv.style.display = "none"
            addEmployeeDp.src = URL.createObjectURL(file)
            addEmployeePreview.style.display = "block"
    }}
// END AVATAR PREVIEW

// POST METHOD IN ADD EMPLOYEE FORM
    function addEmployee(){
        // fetch("http://localhost:4000/addEmployee", {
        // method: "POST",
        // headers: {
        // "Content-Type": "application/json"
        // },
        // body: JSON.stringify(addEmployeeObject()), 
        // })
        // .then((response) => {
        // if (!response.ok) {
        // return response.json()
        //     .then((errorResponse) => {
        //     modalMsg.innerText = "Employee creation failed !"
        //     modalEl.style.backgroundColor = "#d93b3b"
        //     modalEl.style.display = "block"
        //     setTimeout(hide,3000)
        //     console.error("Server validation errors:", errorResponse.errors);
        // });
        // }
        // return response.json();
        // })
        // .then((responseData) => {
        // modalMsg.innerText = responseData.message
        // modalEl.style.backgroundColor = "#3ea31a"
        // modalEl.style.display = "block"
        // setTimeout(hide,1500)
        // // setTimeout(() => { location.reload() }, 1550);
        // console.log("Server response:", responseData);

        // // 
        // fetch("http://localhost:4000/employees").then((data)=>{
        //     return data.json();
        // }).then((employee)=>{
        // pagination(employee)  
        // })
        // // // 
        // })

        // CALLING A FUNCTION TO POST AVATAR
            // fetch("http://localhost:3000/employees").then((data)=>{
            //     return data.json();
            // }).then((employee)=>{ 
            //     let index = employee.length-1
            //     let id= employee[index].id
            //     console.log(id);
            //     uploadAvatar(id,addEmployeeAvatar)
            // })
        //END CALLING A FUNCTION TO POST AVATAR
        overlayEl.style.display = "none"
        addEmployeeForm.style.display = "none"
    }

//END POST METHOD IN ADD EMPLOYEE FORM

// OBJECT FOR POST METHOD
    function addEmployeeObject() {
        let salutationEl = document.getElementById("salutation").value
        let firstNameEl = document.getElementById("firstName").value
        let lastNameEl = document.getElementById("lastName").value
        let emailEl = document.getElementById("email").value
        let phoneEl = document.getElementById("phone").value
        let dobEl = document.getElementById("dob").value
        let qualificationsEl = document.getElementById("qualifications").value
        let addressEl = document.getElementById("address").value
        let cityEl = document.getElementById("city").value
        let stateEl = document.getElementById("state").value
        let countryEl = document.getElementById("country").value
        let usernameEl =document.getElementById("username").value
        let passwordEl =document.getElementById("password").value
    
    let user = {
        salutation: salutationEl,
        firstname: firstNameEl,
        lastname: lastNameEl,
        email: emailEl,
        phone: phoneEl,
        dob: dob(dobEl),
        gender: gender(),
        qualifications: qualificationsEl,
        address: addressEl,
        city: cityEl,
        state: stateEl,
        country: countryEl,
        username: usernameEl,
        password: passwordEl
    }
    return user;

        // GENDER FUNCTION
        function gender(){
            if( document.getElementById("male").checked){
            return maleEl;
            }else if(document.getElementById("female").checked){
            return femaleEl;
            }else{
                return("other")
        }}
        //END GENDER FUNCTION
    }
//END OBJECT FOR POST METHOD

//END ADD EMPLOYEE FORM 

// EDIT EMPLOYEE FORM
    let editEmployeeCloseBtn = document.getElementById("editEmployeeClose")
    let editEmployeeCanceleBtn = document.getElementById("editEmployeeCancel")
    let editEmployeeForm = document.getElementById("editEmployeeForm")
    let editEmployeeId //globally assigned for put method and Post avatar
    let changeDp = document.getElementById("changedp")
    let profPic ; //globally storing avatar
    let editEmployeeSaveBtn = document.getElementById("editEmployeeSave")
    let editEmployeeDp = document.getElementById("editEmployeeDp")

// BUTTONS AND ITS FUNCTIONS   
    changeDp.addEventListener("change",editFormImagePreview)     
    editEmployeeCloseBtn.addEventListener("click",function(){
        editEmployeeForm.classList.replace('fadeIn', 'fadeOut')
         setTimeout(()=>{
            editEmployeeForm.style.display="none"},100)
        setTimeout(()=>{
            editEmployeeForm.classList.replace('fadeOut', 'fadeIn');
        },1500)
        overlayEl.style.display = "none"
    })

    editEmployeeCanceleBtn.addEventListener("click",function(){
        editEmployeeForm.classList.replace('fadeIn', 'fadeOut')
         setTimeout(()=>{
            editEmployeeForm.style.display="none"},100)
        setTimeout(()=>{
            editEmployeeForm.classList.replace('fadeOut', 'fadeIn');
        },1500)
        overlayEl.style.display = "none"
    })

    changeDp.addEventListener('change' , () => {
        profPic = changeDp.files[0];
    })
//END BUTTONS AND ITS FUNCTIONS

// FILLED EDIT FORM
    async function editDetails(id){
        optionBoxHide()
        try{
            const response = await fetch("http://localhost:4000/employees/"+ new URLSearchParams({id : `${id}`})).then((data)=>{
                return data.json()
            }).then((employee)=>{
            // console.log(employee);
            // console.log(employee.salutation);
            editEmployeeId = id;

        let male = document.getElementById("editMale")
        let female = document.getElementById("editFemale")
        document.getElementById("editSalutation").value = employee.salutation
        document.getElementById("editFirstName").value = employee.firstname
        document.getElementById("editLastName").value = employee.lastname
        document.getElementById("editUsername").value = employee.username
        document.getElementById("editPassword").value = employee.password
        document.getElementById("editEmail").value = employee.email
        document.getElementById("editPhone").value = employee.phone
        document.getElementById("editDob").value = removeTimeFromDOB(employee.dob) //yy-mm-dd format
        employee.gender === 'Male' ? male.checked = true : female.checked = true;
        document.getElementById("editQualifications").value = employee.qualifications
        document.getElementById("editAddress").value = employee.address
        document.getElementById("editCountry").value = employee.country
        document.getElementById("editState").value = employee.state
        document.getElementById("editCity").value = employee.city
        // document.getElementById("editEmployeeDp").src = "http://localhost:4000/employees/"+editEmployeeId+"/avatar"

            })
        }catch (error){
            console.error("Error fetching data:", error);
    }

    function removeTimeFromDOB(birthdate){
        let array = []
        let date = birthdate.split('T')
        array.push(date[0])
        return array[0]
      }
// }

        // fetch("http://localhost:3000/employees/"+id).then((data)=>{
        //     return data.json();
        // }).then((employee)=>{
        // editEmployeeId = id;

        // let male = document.getElementById("editMale")
        // let female = document.getElementById("editFemale")
        // document.getElementById("editSalutation").value = employee.salutation
        // document.getElementById("editFirstName").value = employee.firstName
        // document.getElementById("editLastName").value = employee.lastName
        // document.getElementById("editUsername").value = employee.username
        // document.getElementById("editPassword").value = employee.password
        // document.getElementById("editEmail").value = employee.email
        // document.getElementById("editPhone").value = employee.phone
        // document.getElementById("editDob").value = dob(employee.dob)
        // employee.gender === 'Male' ? male.checked = true : female.checked = true;
        // document.getElementById("editQualifications").value = employee.qualifications
        // document.getElementById("editAddress").value = employee.address
        // document.getElementById("editCountry").value = employee.country
        // document.getElementById("editState").value = employee.state
        // document.getElementById("editCity").value = employee.city
        // document.getElementById("editEmployeeDp").src = "http://localhost:3000/employees/"+editEmployeeId+"/avatar"
        
        overlayEl.style.display = "block"
        editEmployeeForm.style.display = "block";
    // })
}
// END FILLED EDIT FORM 

// AVATAR PREVIEW
    function editFormImagePreview(){
        const [file] = changeDp.files
        if (file) {
        editEmployeeDp.src = URL.createObjectURL(file)
    }}
// END AVATAR PREVIEW

// PUT METHOD IN EDIT EMPLOYEE FORM
     function editEmployeePutMethod(){
        console.log(editEmployeeId);
        //   fetch("http://localhost:4000/editemployee/"+ new URLSearchParams({id : `${editEmployeeId}`}), {
        //     method: "PUT",
        //     headers: {
        //     "Content-Type": "application/json"
        //     },
        //     // body: editedObject()
        //     body: JSON.stringify(editedObject())
        //     })
        
        // if(profPic){
        // uploadAvatar(editEmployeeId,profPic)
        // }
        // let updateEmployee = editedObject()
        // console.log(updateEmployee);
        // try {
   
        //     .then((response) => {
        //         if (!response.ok) {
        //         return response.json().then((errorResponse) => {
        //             modalMsg.innerText = "Employee updation failed !"
        //             modalEl.style.backgroundColor = "#d93b3b"
        //             modalEl.style.display = "block"
        //             setTimeout(hide,3000)
    
        //             console.error("Server validation errors:", errorResponse.errors);
        //             // Handle the validation errors here
        //         })}
        //         return response.json();
        //     })
        //     .then((responseData) => {
        //         // Handle the successful response here
        //         modalMsg.innerText = responseData.message
        //         modalEl.style.backgroundColor = "#3ea31a"
        //         modalEl.style.display = "block"
        //         setTimeout(hide,1500)
        //         // setTimeout(() => { location.reload() }, 1550);
        //         console.log("Server response:", responseData);

        //                 fetch("http://localhost:3000/employees").then((data)=>{
        //                     return data.json();
        //                 }).then((employee)=>{
        //                 pagination(employee)  
        //                 })
        //     })
        // }catch (error) {
        //     // console.error("Error in PUT request:", error);
        // }
        editEmployeeForm.style.display = "none";
        overlayEl.style.display= "none"
    }

// END PUT METHOD IN EDIT EMPLOYEE FORM

// OBJECT FOR PUT METHOD
    function editedObject(){
        let user = {
            salutation : document.getElementById("editSalutation").value,
            firstname : document.getElementById("editFirstName").value,
            lastname : document.getElementById("editLastName").value,
            email : document.getElementById("editEmail").value,
            phone : document.getElementById("editPhone").value,
            dob : document.getElementById("editDob").value,
            // gender : gender(),
            qualifications : document.getElementById("editQualifications").value,
            address : document.getElementById("editAddress").value,
            city : document.getElementById("editCity").value,
            state : document.getElementById("editState").value,
            country : document.getElementById("editCountry").value,
            username: document.getElementById("editUsername").value,
            password: document.getElementById("editPassword").value
        }

    return user

    // GENDER FUNCTION
        function gender(){
            let male = document.getElementById("editMale")
            let female = document.getElementById("editFemale")
            if(male.checked ==true){
                return male.value
            }else if(female.checked== true){
                return female.value
        }
    // END GENDER FUNCTION
    }}

//END OBJECT FOR PUT METHOD

// END EDIT EMPLOYEE FORM

// DELETE EMPLOYEE FORM
let deleteEmployeeFormEl = document.getElementById("deleteEmployeeForm")
let deleteEmployeeCloseBtn = document.getElementById("deleteEmployeeClose")
let deleteEmployeeCancelBtn = document.getElementById("deleteEmployeeCancel")
let deleteEmployeeDeleteBtn = document.getElementById("deleteEmployeeDelete")

// BUTTONS AND FUNCTIONS
    deleteEmployeeCloseBtn.addEventListener("click",function(){
        deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{
            deleteEmployeeFormEl.style.display="none"},100)
        setTimeout(()=>{
            deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn');
        },1500)
        overlayEl.style.display = "none"
    })

    deleteEmployeeCancelBtn.addEventListener("click",function(){
        deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{
            deleteEmployeeFormEl.style.display="none"},100)
        setTimeout(()=>{
            deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn');
        },1500)
        overlayEl.style.display = "none"
    })
// END BUTTONS AND FUNCTIONS

// DELETE METHOD 
    function deleteDetails(id){
        optionBoxHide()
        deleteEmployeeFormEl.style.display= "block"
        overlayEl.style.display ="block"
    
        deleteEmployeeDeleteBtn.addEventListener("click",function(){
            fetch("http://localhost:4000/deleteemployee/"+new URLSearchParams({id : `${id}`}), {
            method: "DELETE"
            })
            .then((response) => {
            if (!response.ok) {
            return response.json().then((errorResponse) => {
                modalMsg.innerText = "Employee deletion failed !"
                modalEl.style.backgroundColor = "#d93b3b"
                modalEl.style.display = "block"
                setTimeout(hide,3000)
                console.error("Server validation errors:", errorResponse.errors);
            })}else{
                // transition for form hide
                deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
                setTimeout(()=>{
                    deleteEmployeeFormEl.style.display="none"},100)
                setTimeout(()=>{
                    deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn');
                },1500)

                fetch("http://localhost:4000/employees/").then((data)=>{
                    return data.json();
                }).then((employee)=>{
                pagination(employee)  
                })

                }
            return response.json();
            })
            .then((responseData) => {
                modalMsg.innerText = responseData.message
                modalEl.style.backgroundColor = "#3ea31a"
                modalEl.style.display = "block"
                setTimeout(hide,1500)
                // setTimeout(() => { location.reload() }, 1550);
                console.log("Server response:", responseData);   
            })
            overlayEl.style.display= "none"
    })}
// END DELETE METHOD

// END DELETE EMPLOYEE FORM

// PAGINATION SECTION
let pagesDiv = document.getElementById("pages")
let start; //global variable 
let end; //global

fetch("http://localhost:4000/employees")
.then((data)=>{
    return data.json();
}).then((objectData)=>{
    employeeList.addEventListener("change",function(){
        pagination(objectData)
    })
})
// PAGINATION FUNCTION
    function pagination(objectData){
        let employeeCount = employeeList.value
        let pages = numOfPage(objectData.length,employeeCount) 
        start = 0 
        end = start+(employeeCount-1)
        let slNum = 1
        let employeeData = []
        for(let i=start;i<=end;i++){
            employeeData.push(objectData[i])
        }
        displayEmployees(employeeData,slNum)

        // CREATING PAGES IN PAGINATION
            pagesDiv.innerHTML = ""
            for(let i = 1; i <= pages ; i++){
                let newSpan = document.createElement('span')
                newSpan.textContent = i
                newSpan.id = 'page'+i
                if(document.getElementById('page1')){
                    document.getElementById('page1').classList.add('pageActive')
                }
                newSpan.onclick = function changePage() {
                    pageBtnActive(newSpan)
                    employeesPerPage(i);
                };
                pagesDiv.appendChild(newSpan);
            }
        //END CREATING PAGES IN PAGINATION

        // ACTIVE PAGE(COLOR) IN PAGINATION
        function pageBtnActive(activePage){
            for(let i=1;i<=pages;i++){
               if(document.getElementById('page'+i).classList.contains('pageActive')){
                    document.getElementById('page'+i).classList.remove('pageActive')
               }}
            activePage.classList.add('pageActive')
        }
        //END ACTIVE PAGE(COLOR) IN PAGINATION

        // PREV PAGE BUTTON [ NOT FINISHED ]
        document.getElementById('prevPage').addEventListener("click",function(){
            for(let i=1;i<=pages;i++){
                // if(document.getElementById("page1").classList.contains('pageActive')) {break};
                if(document.getElementById('page'+i).classList.contains('pageActive')){
                    document.getElementById('page'+i).classList.remove('pageActive')
                    document.getElementById('page'+(i-1)).classList.add('pageActive')
                    employeesPerPage(i-1);
            }}
        })
        // END PREV PAGE BUTTON

        // NEXT PAGE BUTTON
        document.getElementById("nextPage").addEventListener("click",function(){
            for(let i=1;i<=pages;i++){
                // if(document.getElementById("page"+pages).classList.contains('pageActive')) {break};
                if(document.getElementById('page'+i).classList.contains('pageActive')){
                    console.log("page"+(i+1));
                    document.getElementById('page'+i).classList.remove('pageActive')
                    document.getElementById('page'+(i+1)).classList.add('pageActive')
                    employeesPerPage(i+1);
                    if(document.getElementById('page'+i)){break};
            }}
        })
        // END NEXT PAGE BUTTON
        

        // CALCULATING NUMBER OF PAGES REQUIRED
            function numOfPage(total,employeePerPage){
                let pageCount = Math.ceil(total/employeePerPage)
                return pageCount
            }
        //END CALCULATING NUMBER OF PAGES REQUIRED

        // ONCLICK FUNCTION OF THE PAGES
            function employeesPerPage(pageNum){
                let employeeArray=[]
                start = (pageNum-1)*employeeCount
                end = start+(employeeCount-1)
                let slNum = ((employeeCount*pageNum)-(employeeCount-1))
                for(let i=start ; i<=end ; i++){
                    if(objectData[i] == undefined){
                        break;
                    }
                    employeeArray.push(objectData[i])
                }
                    displayEmployees(employeeArray,slNum)
            }
        //END ONCLICK FUNCTION OF THE PAGES
    }
// END PAGINATION FUNCTION

// END PAGINATION

// SUCCESS & FAIL MESSAGE HIDE FUNCTION
function hide(){
    modalEl.style.display = "none"
}
//END SUCCESS & FAIL MESSAGE HIDE FUNCTION

// VALIDATION

//  SOME COMMON REMOVING VALIDATION MESSAGE
function removeValMessage(inputId,valId){
    if(!document.getElementById(inputId).value==""){
        document.getElementById(valId).style.display= "none"
    }else{
        document.getElementById(valId).style.display= "block"
}}
    // END SOME COMMON REMOVING VALIDATION MESSAGE

// ADD EMPLOYEE FORM VALIDATION
    function addEmployeeValidation(){
        let addEmployeeValidationSuccess = true

        if(!document.getElementById("salutation").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valSal").style.display= "block"
        }
        if(!document.getElementById("firstName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valFN").style.display= "block"
        } 
        if(!document.getElementById("lastName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valLN").style.display= "block"
        }
         if(!document.getElementById("email").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEmail").style.display= "block"
        }
         if(!document.getElementById("phone").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valMob").style.display= "block"
        }
         if(!document.getElementById("dob").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valDob").style.display= "block"
        }
         if(!document.getElementById("address").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valAddress").style.display= "block"
        }
         if(!document.getElementById("city").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valCity").style.display= "block"
        }
         if(!document.getElementById("state").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valState").style.display= "block"
        }
         if(!document.getElementById("country").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valCountry").style.display= "block"
        }
         if(!document.getElementById("username").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valUN").style.display= "block"
        }
         if(!document.getElementById("password").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valPass").style.display= "block"
        }
        //  if(!document.getElementById("pinzip").value){
        //     addEmployeeValidationSuccess = false
        //     document.getElementById("valPin").style.display= "block"
        // }
        if(document.getElementById("male").checked==false && document.getElementById("female").checked==false){
            addEmployeeValidationSuccess = false
            document.getElementById("valGender").style.display= "block"
        }
        if(addEmployeeValidationSuccess == true){ 
            addEmployee() //call posting function
    }}

    // REMOVING VALIDATION MESSAGE FROM ADD EMPLOYEE FORM
        document.getElementById("salutation").addEventListener("change",function(){
            if(!document.getElementById("salutation").value==""){
                document.getElementById("valSal").style.display = "none"
            }else{
                document.getElementById("valSal").style.display = "block"
        }})
        document.getElementById("country").addEventListener("change",function(){
            if(!document.getElementById("country").value==""){
            document.getElementById("valCountry").style.display= "none"
        }else{
            document.getElementById("valCountry").style.display= "block"
        }})
        document.getElementById("state").addEventListener("change",function(){
            if(!document.getElementById("state").value==""){
                document.getElementById("valState").style.display= "none"
            }else{
                document.getElementById("valState").style.display= "block"
        }})
        document.getElementById("dob").addEventListener("change",function(){
            if(!document.getElementById("dob").value==""){
                document.getElementById("valDob").style.display= "none"
            }else{
                document.getElementById("valDob").style.display= "block"
        }})
        document.getElementById("male").addEventListener("change",function(){
            if(!document.getElementById("male")==""){
                document.getElementById("valGender").style.display= "none"
            }else{
                document.getElementById("valGender").style.display= "block"
        }})
        document.getElementById("female").addEventListener("change",function(){
            if(!document.getElementById("female")==""){
                document.getElementById("valGender").style.display= "none"
            }else{
                document.getElementById("valGender").style.display= "block"
        }})
        document.getElementById("phone").addEventListener("keyup",function(){
            const phone = /^\d{10}$/;
            if(document.getElementById("phone").value.length !== 10){
                document.getElementById("valMob").style.display= "block"
            }else{
                document.getElementById("valMob").style.display= "none"
            }
    })
    // END REMOVING VALIDATION MESSAGE FROM ADD EMPLOYEE FORM

// END ADD EMPLOYEE FORM VALIDATION

// EDIT EMPLOYEE FORM VALIDATION
    function editEmployeeValidation(){
        let addEmployeeValidationSuccess = true

        if(!document.getElementById("editSalutation").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditSal").style.display= "block"
        }
        if(!document.getElementById("editFirstName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditFN").style.display= "block"
        } 
        if(!document.getElementById("editLastName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditLN").style.display= "block"
        }
         if(!document.getElementById("editEmail").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditEmail").style.display= "block"
        }
         if(!document.getElementById("editPhone").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditMob").style.display= "block"
        }
         if(!document.getElementById("editDob").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditDob").style.display= "block"
        }
         if(!document.getElementById("editAddress").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditAddress").style.display= "block"
        }
         if(!document.getElementById("editCity").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditCity").style.display= "block"
        }
         if(!document.getElementById("editState").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditState").style.display= "block"
        }
         if(!document.getElementById("editCountry").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditCountry").style.display= "block"
        }
         if(!document.getElementById("editUsername").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditUN").style.display= "block"
        }
         if(!document.getElementById("editPassword").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditPass").style.display= "block"
        }
        //  if(!document.getElementById("editPin/zip").value){
            // addEmployeeValidationSuccess = false
            // document.getElementById("valEditPin").style.display= "block"
        // }
        if(document.getElementById("editMale").checked==false && document.getElementById("editFemale").checked==false){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditGender").style.display= "block"
        }
        if(addEmployeeValidationSuccess==true){ 
            editEmployeePutMethod() //calling put function
    }}

        // REMOVING VALIDATION MESSAGE FROM EDIT EMPLOYEE FORM
            document.getElementById("editSalutation").addEventListener("change",function(){
                if(!document.getElementById("editSalutation").value==""){
                    document.getElementById("valEditSal").style.display= "none"
                }else{
                    document.getElementById("valEditSal").style.display= "block"
            }})
            document.getElementById("editCountry").addEventListener("change",function(){
                if(!document.getElementById("editCountry").value==""){
                document.getElementById("valEditCountry").style.display= "none"
            }else{
                document.getElementById("valEditCountry").style.display= "block"
            }})
            document.getElementById("editState").addEventListener("change",function(){
                if(!document.getElementById("editState").value==""){
                    document.getElementById("valEditState").style.display= "none"
                }else{
                    document.getElementById("valEditState").style.display= "block"
            }})
            document.getElementById("editDob").addEventListener("change",function(){
                if(!document.getElementById("editDob").value==""){
                    document.getElementById("valEditDob").style.display= "none"
                }else{
                    document.getElementById("valEditDob").style.display= "block"
            }})
            document.getElementById("editMale").addEventListener("change",function(){
                if(!document.getElementById("editMale")==""){
                    document.getElementById("valEditGender").style.display= "none"
                }else{
                    document.getElementById("valEditGender").style.display= "block"
            }})
            document.getElementById("editFemale").addEventListener("change",function(){
                if(!document.getElementById("editFemale")==""){
                    document.getElementById("valEditGender").style.display= "none"
                }else{
                    document.getElementById("valEditGender").style.display= "block"
            }})
            document.getElementById("editPhone").addEventListener("keyup",function(){
                const phone = /^\d{10}$/;
                if(document.getElementById("editPhone").value.length !== 10){
                    document.getElementById("valEditMob").style.display= "block"
                }else{
                    document.getElementById("valEditMob").style.display= "none"
                }
        })
        // END REMOVING VALIDATION MESSAGE FROM EDIT EMPLOYEE FORM

// END EDIT EMPLOYEE FOR VALIDATION

// END VALIDATION

//  OPTION BOX HIDE FUNCTION
    let overlayOptionBox = document.getElementById("overlayOptionBox")
    
    overlayOptionBox.addEventListener("click",optionBoxHide)

    function optionBoxHide(){
        deleteEmployeeFormEl.style.display="none"
        overlayOptionBox.style.display = "none"
        overlayEl.style.display="none"
        editEmployeeForm.style.display="none"
        for(let i=0;i<employeeList.value;i++){
            let box = document.getElementById("optionBox"+i)
            if(box == undefined){
                break
            }
            if(box.classList.contains("pops")){
                box.classList.remove("pops")
            }
    }}
//END OPTION BOX HIDE FUNCTION

// function prevPage(){
//     for(let i=1;i<=pages;i++){
//             if(document.getElementById('page'+i).classList.contains('pageActive')){
//                 // pageBtnActive(newSpan)
//                 // employeesPerPage(i-1);
//                 console.log("YES");
            
//                 // changePage(i-1)
//         }}
// }