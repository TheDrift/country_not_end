const RouteList = [
  {
    title:'All countries',
    route:'all'
  },
  {
    title:'Africa',
    route:'africa'
  },
  {
    title:'Americas',
    route:'americas'
  },
  {
    title:'Asia',
    route:'asia'
  },
  {
    title:'Europe',
    route:'europe'
  },
  {
    title:'Oceania',
    route:'oceania'
  }  
]
const endPointList = {
  all:"all",
  capital:'capital',
  region:"region",
  name:'name'
}
const $row = document.querySelector('.row')
const $loader = document.querySelector('.loader')
const $navbarList = document.querySelector('.navbarList')
const $select = document.querySelector('.select')
const $search = document.querySelector('.search')
function getBase(endPoint, cb){
  fetch(`https://restcountries.com/v3.1/${endPoint}`)
  .then(res => res.json())
  .then(res => cb(res))
}
window.addEventListener('load' , () =>{
  const links = RouteList.map(({title, route}) =>{
    return RoudeTemplate(title , route)
  }).join('')
  $navbarList.innerHTML = links
  $loader.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`
  getBase(endPointList.all , res =>{
    Template(res)
  })
})
function RoudeTemplate(title, route){
  return `
      <li class="nav-item">
        <a onclick="getRoute('${route}')" class="nav-link btn">${title}</a> 
      </li>
    `
}
function getRoute(route){
  if(route === 'all'){
    getBase(`${endPointList.all}` , res =>{
      Template(res)
    })
  }else{
    getBase(`${endPointList.region}/${route}` , res =>{
      Template(res)
    })
  }
}
function Template(base){
  const template = base.map(item =>{
    return card(item)
  }).join('')
  $row.innerHTML = template
}
function card(countru){
  return`
    <div class="col-12 col-sm-6 col-xl-4 mt-4">
      <div class="card ">
        <div class="card-header text-center">
          <i>${countru.name.common} ${countru.flag ? countru.flag : ''}</i>
        </div>
        <div class="card-image">
          <img src="${countru.flags.svg}" class="w-100" style="height:300px;object-fit:cover" />
        </div>
        <div class="card-footer">
          <button class="btn btn-success w-100" onclick="getMore('${countru.name.common}')">More</button>
        </div>
      </div>
    </div>
  `
}
function getMore(more){
  console.log(more);
  getBase(`${endPointList.name}/${more}` , res =>{
    console.log(res);
  })
}
$select.addEventListener('change' , e =>{
  var value = e.target.value

  if(value === 'capital'){
    $search.setAttribute('placeholder' , 'Search by Capital')
    $search.classList.add('border-success')
    $search.classList.remove('border-primary')
  }else{
    $search.setAttribute('placeholder' , 'Search by Name')
    $search.classList.add('border-primary')
    $search.classList.remove('border-success')
  }
})
$search.addEventListener('input' , e =>{
  var value = e.target.value
  var selectes = $select.value
  if(selectes === 'capital'){
    getBase(`${endPointList.capital}/${value}` , res =>{
      Template(res)
    })
  }else{
    getBase(`${endPointList.name}/${value}` , res =>{
      Template(res)
    })
  }
})