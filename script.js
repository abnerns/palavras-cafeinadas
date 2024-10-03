const form = document.getElementById('form');
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const nameRegex = /^[A-Za-z\s]+$/;
const fields = document.querySelectorAll(".required");
const validate = document.querySelectorAll(".validate");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validName = nameValidate();
    const validEmail = emailValidate();
    const validMessage = messageValidate();

    if (validName && validEmail && validMessage){
        const listLocal = JSON.parse(localStorage.getItem('listLocal') || '[]')
        listLocal.push({
            name: fields[0].value,
            email: fields[1].value,
            message: fields[2].value
        })

        localStorage.setItem('listLocal', JSON.stringify(listLocal))
        
        fields[0].value = '';
        fields[1].value = '';
        fields[2].value = '';
    }
})

function validateError(i){
    fields[i].classList.add('border-error');
    validate[i].style.display = 'block';
}

function validateApproved(i){
    fields[i].classList.remove('border-error');
    validate[i].style.display = 'none';
}

function nameValidate(){
    if (fields[0].value === "" || !nameRegex.test(fields[0].value)) {
        validateError(0);
        return false;
    } else {
        validateApproved(0);
        return true;
    }
}

function emailValidate(){
    if(emailRegex.test(fields[1].value)){
        validateApproved(1);
        return true;
    }else{
        validateError(1);
        return false;
    }
}

function messageValidate(){
    if(fields[2].value.length<10){
        validateError(2);
        return false;
    }else{
        validateApproved(2);
        return true;
    }
}

window.onload = function(){
    const menu = document.querySelector('.hamburger');
    const mobile = document.querySelector('.mobile-nav')
    const logoText = document.getElementById('logo-text');
    const background = document.querySelectorAll('main, footer');

    menu.addEventListener('click', function () {
        menu.classList.toggle('is-active');
        mobile.classList.toggle('is-active');
        background.forEach(element => {
            element.classList.toggle('overlay');
        });

        if (logoText.style.display === 'none') {
            logoText.style.display = 'block';
        } else {
            logoText.style.display = 'none';
        }
    })
}