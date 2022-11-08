class Component {
    constructor() {
        if (this.constructor == Component) {
            throw new Error("Can't be instantiated!")
        }
        
    }
    render() {
        throw new Error("Method 'render()' must be implemented")
    }
}

class Car{
    static list = [];
  
    static init(cars) {
      this.list = cars.map((i) => new this(i));
    }

    
  
    constructor({
      id,
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      transmission,
      available,
      type,
      year,
      options,
      specs,
      availableAt,
    }) {
      this.id = id;
      this.plate = plate;
      this.manufacture = manufacture;
      this.model = model;
      this.image = image;
      this.rentPerDay = rentPerDay;
      this.capacity = capacity;
      this.description = description;
      this.transmission = transmission;
      this.available = available;
      this.type = type;
      this.year = year;
      this.options = options;
      this.specs = specs;
      this.availableAt = availableAt;
      this.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  
    render() {
      return `
        <p>id: <b>${this.id}</b></p>
        <p>plate: <b>${this.plate}</b></p>
        <p>manufacture: <b>${this.manufacture}</b></p>
        <p>model: <b>${this.model}</b></p>
        <p>available at: <b>${this.availableAt}</b></p>
        <img src="${this.image}" alt="${this.manufacture}" width="64px">
      `;
    }
  }
  

// export class Car extends Component {

// }



const selector = document.querySelector(".custom-select")

selector.addEventListener('mousedown', e => {
    const selectOptionExist = document.querySelector('.selector-options')
    e.preventDefault();
        const selectBox = document.createElement('ul');
        selectBox.classList.add('selector-options')
        const originalSelect = selector.children[0]
        const select = [...selector.children[0]]
        select.shift();
        select.forEach(option => {
            const selectOption = document.createElement('li')
            selectOption.textContent = option.textContent;
            selectOption.classList.add('option')
            selectOption.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                originalSelect.value = option.value
                originalSelect.dispatchEvent(new Event('change'));
                selectBox.remove()
            })
            selectBox.appendChild(selectOption);
        });
        if (!selectOptionExist) {
            selector.appendChild(selectBox)
        } else {
            selectOptionExist.remove()
        }
})

const findCarButton = document.querySelector("#find-car")
const inputs = document.querySelectorAll(".inputs")
const carsPopulation = document.querySelector(".cars")

findCarButton.addEventListener('click', async (e) => {
    carsPopulation.textContent = ''
    const date = inputs[1].value.split('-')
    const time = inputs[2].value.split(':')
    const validDate = inputs[1].value && inputs[2].value
    const dataTime = new Date(date[0], date[1]-1, date[2], time[0], time[1])
    let withDriver = inputs[0].value;
    if (withDriver == "Dengan Sopir") {
      withDriver = true;
    } else if (withDriver == "Tanpa Sopir (Lepas Kunci)") {
      withDriver = false;
    } else {
      withDriver = null;
    }
    const inputValues = {
        time:dataTime,
        passengers:inputs[3].value,
        withDriver
    }
    // let filter = e => e.capacity >= inputValues.passengers && e.availableAt<=inputValues.time
    // // console.log(inputValues.time)
    // if (!inputValues.passengers && inputValues.time instanceof Date) {
    //   filter=0
    // }
    const cars = await Binar.listCars(inputValues)
    cars.forEach((e) => {
      const carObject = new Car(e);
      const rendered = carObject.render();
      let dom = document.createElement('div');
      dom.classList.add('bg-red-200')
      dom.innerHTML = rendered;
      carsPopulation.appendChild(dom)

    })

    // if (!inputValues.time.isValid) {
    //     console.log("Salah")
    // } else {
    //     benar
    // }
})
// console.log(findCarButton)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  class Binar {
    static populateCars = (cars) => {
      return cars.map((car) => {
        const isPositive = getRandomInt(0, 1) === 1;
        const timeAt = new Date();
        const mutator = getRandomInt(1000000, 100000000);
        const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))
        const withDriver = Math.random() < 0.5
        return {
          ...car,
          availableAt,
          withDriver
        };
      })
    }
  
    static async listCars(inputValues) {
        let cars;
        let cachedCarsString = localStorage.getItem("CARS");
    
        if (!!cachedCarsString) {
          const cacheCars = JSON.parse(cachedCarsString);
          cars = this.populateCars(cacheCars);
        } else {
          const response = await fetch(
            "http://localhost:2000/data/cars"
          );
          const body = await response.json();
          cars = this.populateCars(body)
    
          localStorage.setItem("CARS", JSON.stringify(cars));
        }
        // const filtered = cars.filter(e => e.availableAt)
        // console.log(filtered)
        // console.log(`${inputValues.time} and ${inputValues.withDriver}`)
        if (inputValues.passenger == undefined) {
          inputValues.passenger =0;
        }
        // cars.forEach((e) => {
        //   console.log(`\n${parseInt(e.availableAt.getTime()) <= parseInt(inputValues.time.getTime())}`)
        //   console.log(`${(e.withDriver == inputValues.withDriver)}`)
        //   console.log( (parseInt(e.availableAt.getTime()) <= parseInt(inputValues.time.getTime())) && (e.withDriver == inputValues.withDriver))
        // })
        if (isNaN(inputValues.time) || inputValues.withDriver == null) {
          return cars
        }
        return cars.filter(e => parseInt(e.availableAt.getTime()) <= parseInt(inputValues.time.getTime()) && e.withDriver == inputValues.withDriver)
    }
  }
  