//Calling Vars
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// yak n5azi b function 
let temp ;
//Mood  var in case of creating and Updating
let mood = 'create';


//to validate that Evrything is Work OK
// console.log(title,price,taxes,ads,discount,total,count,category,submit)


/*=============Start Project=============*/
//Function to Get Total Price

function getTotal(){

  if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result;
    total.style.background = '#040';
  }
  else{
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }

}



//lahi y5lg error programm eygra mn lvog gayis ta7t
// yjbar array 5awye nyn tm t3dl reload localSto mat7km objts
//let dataPro = [];

let dataPro ;
if(localStorage.product != null){
  dataPro = JSON.parse(localStorage.product)
}else{
  dataPro = []
}
//Function to Create product

submit.onclick = function (){
  let newPro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
  }

  if(mood === 'create'){
    if(newPro.count > 1){
      for(let i = 0 ; i < newPro.count ; i++){
        //push() method adds new items to the end of an array 
        dataPro.push(newPro);
      }
    }else{
      dataPro.push(newPro)
    }
  }
  //else nyn y3ud l mood Update
  else{
    dataPro[    temp    ] = newPro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
  }



  //Function to Save in LocalStorage
  //go to localStrorage and create in it item and save in it data
  localStorage.setItem('product', JSON.stringify(dataPro))
  
  clearData();

  showData();

}



//Function to Clear inputs after creating a product
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

//Function after creating a product we have to display it in the table (READ)
function showData(){

  let table = '';

  for(let i = 0 ; i < dataPro.length ; i++ ){
    table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData( ${i} )" id="update">update</button></td>
    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
  </tr>`
    ;
  }
  document.getElementById('tbody').innerHTML = table ;
  let btnDelete = document.getElementById('deleteAll');
  if(dataPro.length > 0 ){
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All (${dataPro.length})</button>
    `
  }
  else{
    btnDelete.innerHTML = '';
  }
    
  
}
showData();
//Function to count " exp :I can create 100 product in one action"

//Function to delete a product 

function deleteData(i){
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

//Function to delete All products
function deleteAll(){
  localStorage.clear()
  //lahi yim7ilk mn 0 iyle a5er index v array
  dataPro.splice(0)
  showData();
}

//Function to update a product
function updateData(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  temp = i ;

}
//Function to Search for any product
let searchMood = 'title';

function getSearchMood(id){
  let search = document.getElementById('search');

  if(id == 'searchTitle'){
    searchMood = 'title';
    search.placeholder = 'Search By Title';
  }
  else{
    searchMood = 'category';
    search.placeholder = 'Search By Category';
  }
  search.focus();
  
}



function  searchData(value)
{
  let table = '';

   if(searchMood == 'title')
   {

    for(let i = 0; i < dataPro.length; i++){
      if(dataPro[i].title.includes(value)){
        
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
      </tr>`
        ;


      }
    }

   }else{

   }
   document.getElementById('tbody').innerHTML = table ;
}


//Clean data exp: No empty inputs or chi mandoru