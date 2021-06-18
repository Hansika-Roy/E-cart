// variables
const cart = document.getElementById('cart')
const courses = document.getElementById('listCourses')
const cartCourses = document.querySelector('#listCart tbody')
const emptyCartBtn = document.getElementById('emptyCart')

// event listeners
loadEventListeners()
function loadEventListeners() {
  // when add to cart btn is clicked
  courses.addEventListener('click', buyCourse);
  // when a single course is removed from cart
  cart.addEventListener('click', deleteCourse);
  // when empty cart btn is clicked
  emptyCartBtn.addEventListener('click', emptyCart);
  // on reloading show data from local storage
  document.addEventListener('DOMContentLoaded', readLS);
}

// functions
function buyCourse(event) {
  event.preventDefault()
  if (event.target.classList.contains('addCart')) {
    const path = event.target.parentElement.parentElement;
    readData(path)
  }
}

function readData(path) {
  const infoCourse = {
    image: path.querySelector('img').src,
    title: path.querySelector('h4').textContent,
    price: path.querySelector('.discounted').textContent,
    id: path.querySelector('a').getAttribute('data-id')
  }
  insertInCart(infoCourse)
}

function insertInCart(infoCourse) {
  const row = document.createElement('tr')
  row.innerHTML = `
  <td>
  <img src="${infoCourse.image}" alt="">
</td>
<td>
  ${infoCourse.title}
</td>
<td>
  ${infoCourse.price}
</td>
<td class="cross">
  <a href="#" class="deleteCourse" data-id="${infoCourse.id}">X</a>
</td>
  `
  cartCourses.appendChild(row)
  saveCourseLS(infoCourse)
}

function getCourseLS() {
  let coursesLS;
  if (localStorage.getItem('courses') === null) {
    coursesLS = []
  }
  else {
    coursesLS = JSON.parse(localStorage.getItem('courses'))
  }
  return coursesLS
}

function saveCourseLS(infoCourse) {
  let courses = getCourseLS()
  courses.push(infoCourse)
  localStorage.setItem('courses', JSON.stringify(courses))
}

function readLS() {
  let coursesLS;
  coursesLS = getCourseLS()

  coursesLS.forEach(function (infoCourse) {
    const row = document.createElement('tr')
    row.innerHTML = `
  <td>
  <img src="${infoCourse.image}" alt="">
</td>
<td>
  ${infoCourse.title}
</td>
<td>
  ${infoCourse.price}
</td>
<td class="cross">
  <a href="#" class="deleteCourse" data-id="${infoCourse.id}">X</a>
</td>
  `
    cartCourses.appendChild(row)
  })

}

function deleteCourse(event) {
  event.preventDefault()
  let course, courseId
  if (event.target.classList.contains('deleteCourse')) {
    event.target.parentElement.parentElement.remove()
    course = event.target.parentElement.parentElement
    courseId = course.querySelector('a').getAttribute('data-Id')
  }
  deleteCourseLS(courseId)
}

function deleteCourseLS(courseId){
  let coursesLS;
  coursesLS = getCourseLS()
  coursesLS.forEach(function(courseLS,index){
    if(courseLS.id === courseId){
      coursesLS.splice(index ,1)
    }
  })
  localStorage.setItem('courses',JSON.stringify(coursesLS))
}

function emptyCart(){
  while (cartCourses.firstChild) {
   cartCourses.removeChild(cartCourses.firstChild) 
  }
  emptyLS()
  return false
}

function emptyLS() {
  localStorage.clear()
}






