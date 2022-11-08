import './style.css';

let users = []




document.addEventListener('DOMContentLoaded', ()=> {
    readUsers().then(()=> {
        

        document.getElementById('all-user').addEventListener('click', () => {
            showAllUser()
            document.getElementById('input-field').style.display = 'none'

        })

        document.getElementById('contact').addEventListener('click', () => {
            showContact()
            document.getElementById('input-field').style.display = 'none'

        })
        
        document.getElementById('all-weight').addEventListener('click', () => {
            let content = document.getElementById('content')
            content.innerHTML = ''
            document.getElementById('input-field').style.display = 'block'
            document.getElementById('height').addEventListener('change', e => {
                sumWeight(e.currentTarget.value)

            })
        })
        document.getElementById('brown-eye').addEventListener('click', () => {
            showBrownEye()
            document.getElementById('input-field').style.display = 'none'

        })
    })
})

async function readUsers() {
    users = await (await fetch('./users.json')).json()
    users = users.users
}


function showAllUser() {
    let content = document.getElementById('content')
    content.innerHTML = ''
    users.sort((a, b)=> a.lastName  > b.lastName)

    let count = 0
    users.forEach(e=> {
        let list = document.createElement('div')
        let name = document.createElement('div')
        if(count % 2 == 0) {
            name.style.background = 'white'
        } else {
            name.style.background = 'lightGreen'
        }
        count++
        name.textContent = 'Vezetéknév: ' + e.firstName + 'Keresztnév: ' + e.lastName
        list.append(name)
        content.append(list)
    })
}

function showContact() {
    let content = document.getElementById('content')
    content.innerHTML = ''
    users.sort((a, b)=> a.username  > b.username)

    let table = document.createElement('table')
    let tr = document.createElement('tr')

    let th1 = document.createElement('th')
    th1.textContent = 'Felhasznéló név'
    tr.append(th1)

    th1 = document.createElement('th')
    th1.textContent = 'email'
    tr.append(th1)
    
    th1 = document.createElement('th')
    th1.textContent = 'Telefonszám'
    tr.append(th1)
    table.append(tr)
    users.forEach(e => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        td1.textContent = e.username

        let td2 = document.createElement('td')
        td2.textContent = e.email
        
        let td3 = document.createElement('td')
        td3.textContent = e.phone

        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        table.append(tr)
    })
    content.append(table)
}


function sumWeight(x) {
    let content = document.getElementById('content')
    content.innerHTML = ''

    let weight = 0
    let filtered = users.filter(e => e.height >= x)
    filtered.forEach(e=> {
        weight += e.weight
    })
    content.textContent = weight + "kg"

}

function showBrownEye() {
    let content = document.getElementById('content')
    content.innerHTML = ''

    content.textContent = users.filter(e=> e.eyeColor === 'Brown').length + 'db barna szemű van'
}