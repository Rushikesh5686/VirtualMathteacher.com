let innerupload=document.querySelector(".innerupload");
let input=innerupload.querySelector("input");
let image=document.querySelector("#image")
let btn=document.querySelector("button")
let text=document.querySelector("#text")
let loading=document.querySelector("#loading")
let output=document.querySelector(".output")
const apikey="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB94cF3hkDItHbFT0m1mGnezl4XA9XMJlM"
input.addEventListener("change",(e)=>{
     
    const file=input.files[0];
    console.log(file);
    if(!file)return
    let reader=new FileReader()
    reader.onload=(e)=>{
        let base64data=e.target.result.split(",")[1];
        filedetail.mime_type=file.type
        filedetail.data=base64data;
       console.log(e)
       console.log(filedetail.mime_type)
       console.log(filedetail.data)
       console.log(base64data)
        image.src=`data:${filedetail.mime_type};base64,${filedetail.data}`
        innerupload.querySelector("span").style.display="none"
    innerupload.querySelector("#icon").style.display="none"
    image.style.display="block"
    output.style.di
    }
    image.src=`data:${filedetail.mime_type};base64,${filedetail.data}`
    
    reader.readAsDataURL(file)
})
innerupload.addEventListener("click",()=>{
    input.click()
})
let filedetail={
    mime_type:null,
    data:null
}
async function generateresponse(params) {
    const Requestoption={
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            "contents": [{
        "parts":[
            {"text": "Solve the mathematical problem with proper steps of solution"},
            {
              "inline_data": {
                "mime_type":filedetail.mime_type,
                "data": filedetail.data
              }
            }
        ]
        }]
        })
    }


    try{
    let response=await fetch(apikey,Requestoption)
    let data=await response.json()
    console.log(data)
    let apiresponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    text.innerHTML=apiresponse
    console.log(apiresponse)
    output.style.display="block"
    }
    catch(e){
        console.log(e)
    }
     finally{
        loading.style.display="none"

    }
}
console.log("Heelo");
btn.addEventListener("click",()=>{
    loading.style.display="block"
    generateresponse()
})
 