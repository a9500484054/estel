import { dataArr } from './dataFile.js';

let data = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log(dataArr);
    const localData = JSON.parse(window.localStorage.getItem('data'))
    data = localData !== null ? localData : dataArr;
    console.log(data);
    fillWrapp();
})

document.addEventListener('click', event => {
    if(event.target.closest('.item-card')) {
        const id = event.target.closest('.item-card').dataset.id
        document.querySelector('#exampleModal').dataset.id = id;
        const dataItem = data.filter(el => +el.id === +id)[0]
        console.log(dataItem);
        fillModal(dataItem)
        openModal('#exampleModal')
    }
})


function fillWrapp() {
    document.querySelector('.item-wrap').innerHTML = '';
    let HTML = ``
    data.forEach(item => {
        HTML += 
        `<div class="col-md-6 col-lg-6 col-xl-4 mb-3 card-none">
            <div class="card item-card" data-id='${item.id}'>
                <div class="card-body">
                    <h3 class="mb-1 item-card__name">${item.name}</h3>
                    <div class="mb-1">
                        <i class="ri-phone-line me-2"></i>
                        <a href="tel:${item.tel}">${item.tel}</a>
                    </div>
                    <p class="mb-2"><i class="ri-map-pin-line me-1"></i><span class="item-card__address">${item.address}</span></p>
                    <p><i class="ri-chat-2-line me-1"></i> Комментарии:</p>
                    <p> ${item.comments}</p>
                </div>
            </div>
        </div>`
    });
    document.querySelector('.item-wrap').innerHTML = HTML;
}

document.querySelector('.btn-save').addEventListener('click', ()=> {
    const modal = document.querySelector('#exampleModal');
    const id = modal.dataset.id 
    const dataItem = data.filter(el => +el.id === +id)[0]

    dataItem.name = modal.querySelector('.name').value
    dataItem.tel = modal.querySelector('.tel').value
    dataItem.address = modal.querySelector('.address').value
    dataItem.LPR = modal.querySelector('.LPR').value
    dataItem.salonBD = modal.querySelector('.salonBD').value
    dataItem.masterBD = modal.querySelector('.masterBD').value
    dataItem.servicePROF = modal.querySelector('.servicePROF').value
    dataItem.paint = modal.querySelector('.paint').value
    dataItem.washingRoom = modal.querySelector('.washingRoom').textContent
    dataItem.reception = modal.querySelector('.reception').textContent
    dataItem.comments = modal.querySelector('.comments').textContent
    fillWrapp();
    window.localStorage.setItem('data', JSON.stringify(data));
    // closeModal('#exampleModal');
});


document.getElementById('search-input').addEventListener('input', (event) => {
    const wrapp = document.querySelector('.item-wrap')
    let value = event.target.value.toUpperCase()
    wrapp.querySelectorAll('.card-none').forEach(el => {
        if (el.querySelector('.item-card__name').textContent.toUpperCase().includes(value) || el.querySelector('.item-card__address').textContent.toUpperCase().includes(value) ) {
            el.classList.remove('d-none'); 
        } else {
            el.classList.add('d-none'); 
        }
    });

});


function fillModal(data) {
    let HTML = 
    `<div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"><i class="ri-phone-line me-2"></i>Наименование</label>
            <input type="text" class="form-control name" name="name" value="${data.name}">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"><i class="ri-phone-line me-2"></i>Телефон</label>
            <input type="text" class="form-control tel" name="tel" value="${data.tel}">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"><i class="ri-map-pin-line me-1"></i> Адрес</label>
            <textarea name="" class="form-control address" name="address" id="">${data.address}</textarea>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"><i class="ri-shield-user-line me-2"></i>Лицо принимающие решение</label>
            <input type="text" class="form-control LPR" name="LPR" value="${data.LPR}">
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><i class="ri-calendar-line me-2"></i> Дата рождения салона</label>
                    <input type="text" class="form-control salonBD" name="salonBD" value="${data.salonBD}" >
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><i class="ri-calendar-line me-2"></i>Дата рождения мастера</label>
                    <input type="text" class="form-control masterBD" name="masterBD" value="${data.masterBD}">
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><i class="ri-chat-2-line me-1"></i> ПРОФ сервис</label>
                    <textarea name="" class="form-control servicePROF" name="servicePROF" id="" value="${data.servicePROF}">${data.servicePROF}</textarea>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><i class="ri-chat-2-line me-1"></i> Краска</label>
                    <textarea name="" class="form-control paint" name="paint" id="" value="${data.paint}">${data.paint}</textarea>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><i class="ri-chat-2-line me-1"></i> Мойка</label>
                    <textarea name="" class="form-control washingRoom" name="washingRoom" id="" value="${data.washingRoom}">${data.washingRoom}</textarea>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"><i class="ri-chat-2-line me-1"></i> Ресепшн</label>
                    <textarea name="" class="form-control reception" name="reception" id="" value="${data.reception}">${data.reception}</textarea>
                </div>
            </div>
        </div>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"><i class="ri-chat-2-line me-1"></i> Комментарии</label>
            <textarea name="" class="form-control comments" name="comments" value="${data.comments}" id=""></textarea>
        </div>
    </div>`
    document.querySelector('.modal-wrapp').innerHTML = HTML;
}

function openModal(selector) {
    new bootstrap.Modal(selector).show();
}
function closeModal(selector) {
    new bootstrap.Modal(selector).hide();
}


