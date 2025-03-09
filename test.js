let a = [];
let ubdareTop = document.querySelector('.UD');
let add = document.querySelector('.submit');
let postIdInput = document.querySelector('#id')
let postTitleInput = document.querySelector('#title')
let postBodyInput = document.querySelector('#body')
let tbody = document.querySelector('tbody');
let surch=document.querySelector('#serch');
let ss=document.querySelector('.ss');
let all=document.querySelector('.all');
let idubdate;

async function GetUserPosts() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');
  let final = await response.json();
  a = final
  console.log(final[1]);
  displayUserPosts(a)
}
GetUserPosts()

function displayUserPosts(arr) {
  tbody.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement('tr');

    let tdID = document.createElement('td');
    tdID.textContent = arr[i].id;

    let tdTitle = document.createElement('td');
    tdTitle.textContent = arr[i].title;

    let tdBody = document.createElement('td');
    tdBody.textContent = arr[i].body;

    let tdDelete = document.createElement('td');

    let deleteb = document.createElement('button');
    deleteb.textContent = 'DELETE';
    deleteb.classList.add('deleteButten');
    deleteb.addEventListener('click', function (e) {
      let id = e.target.parentElement.parentElement.children[0].innerText;
      tr.remove()
      // a.splice(id, 1);
      // displayUserPosts(a)
    })
    tdDelete.append(deleteb);
    // ubdate butten

    let tdUpdate = document.createElement('td')

    let ubdatb = document.createElement('button');
    ubdatb.textContent = 'UPDATE';
    ubdatb.classList.add('ubdatButten');

    ubdatb.addEventListener('click', function (e) {
      add.classList.add('hide')
      ubdareTop.classList.remove('hide')
      let id = e.target.parentElement.parentElement.children[0].innerText
      idubdate = id;
      // console.log(idubdate);
      postIdInput.value = id
      postTitleInput.value = e.target.parentElement.parentElement.children[1].innerText
      postBodyInput.value = e.target.parentElement.parentElement.children[2].innerText
      // this.remove();
      // console.log(id);
      // a.splice(id, 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
    tdUpdate.append(ubdatb);

    // apend in tr
    tr.append(tdID, tdTitle, tdBody, tdDelete, tdUpdate);
    //apend all in tbody
    tbody.append(tr)

  }
}


add.addEventListener('click', function () {
  console.log('hello');

  let obj = {
    body: postBodyInput.value,
    id: a.length + 1,
    title: postTitleInput.value,
  }
  a.push(obj)
  displayUserPosts(a)

})
ubdareTop.addEventListener('click', function (e) {
  add.classList.remove('hide')
  ubdareTop.classList.add('hide')
  //  let id = e.target.parentElement.parentElement.children[0].innerText
  // console.log(id);
  let obj = {
    body: postBodyInput.value,
    id: idubdate,
    title: postTitleInput.value,
  }
  a.splice(idubdate - 1, 1, obj)
  displayUserPosts(a)

  postIdInput.value = ''
  postTitleInput.value ='' 
  postBodyInput.value =''

})

ss.addEventListener('click',function(){
//  console.log(surch.value);
  let d= a.filter(function(i){
    return i.id==surch.value;
   })
  displayUserPosts(d)
})

all.addEventListener('click',function(){
  surch.value=''
  displayUserPosts(a)
})