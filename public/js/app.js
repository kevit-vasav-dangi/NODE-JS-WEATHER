//const { response } = require("express");

console.log('hello');
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messagone=document.querySelector('#msg-1')
const messageTwo=document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error);
            messagone.textContent=data.error
        }else{
            // console.log(data.location);
            // console.log(data.forecast);
            messagone.textContent='location:'+data.location
            messageTwo.textContent='forecast:'+data.forecast

        }
    })
})
//console.log('testing');
})