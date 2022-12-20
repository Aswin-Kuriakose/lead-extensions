myLeads = []
const inputElement = document.getElementById('input-el')
const saveBttn = document.getElementById('save-btn')
const deleteBttn = document.getElementById('delete-btn')
const tabBttn = document.getElementById('tab-btn')
const listElement = document.getElementById('list-el')
const leadsFromLocalStorage =JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    showOnList(myLeads)
}
tabBttn.addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        showOnList(myLeads)
    })
})

saveBttn.addEventListener('click', function () {

    myLeads.push(inputElement.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    showOnList(myLeads)
    inputElement.value = ''
})

function showOnList(leads) {
    let listItems = ''
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li><a target="_blank">${leads[i]}</a></li>    
    `}
    listElement.innerHTML = listItems
}
deleteBttn.addEventListener('dblclick', function(){
    myLeads = []
    showOnList(myLeads)
    localStorage.clear()
})