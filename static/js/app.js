const recepie_book = {
    'rice_and_kelp' : [[1, 2], 10],
    'rice_and_fish' : [[1, 3], 20],
    'rice_and_caviar' : [[1, 6], 25],
    'rice_and_bamboo' : [[1, 4], 25],
    'rice_and_bamboo_and_kelp' : [[1, 2, 4], 25],
    'rice_and_fish_and_kelp' : [[1, 2, 3], 30],
    'rice_and_caviar_and_kelp' : [[1, 2, 6], 40],
    'double_rice_and_kelp' : [[1, 1, 2], 15],
    '__vegetable' : [[5], 15],
    '__meat' : [[7], 15],
    '__crab' : [[8], 15],
    '__catfish' : [[9], 15],
}

const image_numbers = [
    'rice',
    'kelp',
    'fish',
    'bamboo',
    'vegetable',
    'caviar',
    'meat',
    'crab',
    'catfish',
]

const upgrade = {
    'rice' : 5,
    'kelp' : 20,
    'fish' : 20,
    'bamboo' : 100,
    'vegetable' : 200,
    'caviar' : 500,
    'meat' : 1000,
    'crab' : 2000,
    'catfish' : 5000,
}

const difficulty_table = [
    [5, 3000],
    [7, 3000],
    [10, 3000],
    [15, 8000],
    [15, 8000],
    [15, 7500],
    [15, 7500],
    [17, 7500],
    [17, 7500],
    [17, 7500],
    [17, 7000],
    [20, 7000],
    [20, 7000],
    [20, 7000],
    [25, 6500],
    [25, 6500],
    [25, 6500],
    [25, 6500],
    [27, 6000],
    [27, 6000],
    [27, 6000],
    [30, 6000],
    [30, 6000],
    [30, 5500],
    [35, 5500],
    [35, 5500],
    [35, 5500],
    [35, 5500],
    [40, 5500],
    [45, 5000],
    [50, 5000],
    [55, 5000],
    [65, 4500],
    [70, 4500],
    [75, 4000],
    [80, 3000],
    [85, 2500],
    [90, 2000],
    [95, 1500],
    [95, 1500],
    [100, 1000],

]

let learned_ingredients = [
    'rice',
    'kelp',
    // 'fish',
    // 'bamboo',
    // 'vegetable',
    // 'caviar',
    // 'meat',
    // 'crab',
    // 'catfish',
]
const findRecipesByIngredient = (ingredient, recepie_book) => {
    const ingredientRecipes = [];
  
    for (let recipe in recepie_book) {
      const requiredIngredients = recepie_book[recipe][0];
      if (requiredIngredients.includes(learned_ingredients.indexOf(ingredient) + 1)) {
        ingredientRecipes.push(recipe);
      }
    }
  
    return ingredientRecipes;
  }

const findAvailableRecipes = (ingredients) => {
    const availableRecipes = [];
  
    for (let recipe in recepie_book) {
      const requiredIngredients = recepie_book[recipe][0];
      const canMakeRecipe = requiredIngredients.every(ingredient =>
        ingredients.includes(learned_ingredients[ingredient - 1])
      );
  
      if (canMakeRecipe) {
        availableRecipes.push(recipe);
      }
    }
  
    return availableRecipes;
}

let day = 1
let money = 100000
let happiness = 0
let unhappiness = 0

let can_go = true

const change_day = (day) => {
    document.querySelectorAll(`.day_count`).forEach(el => {
        el.textContent = day
    })
}

const change_money = (amount) => {
    document.querySelectorAll(`.money_count`).forEach(el => {
        el.textContent = amount + '$'
    })
}

const change_happiness = (points) => {
    document.querySelectorAll(`.happy_count`).forEach(el => {
        el.textContent = points
    })
}

const change_unhappiness = (points) => {
    document.querySelectorAll(`.unhappy_count`).forEach(el => {
        el.textContent = points
    })
}

const add_human = (food_arr) => {
    const customers = document.querySelector(`.customers`)
    if (customers.childNodes.length <= 5) {

        const customer = document.createElement("div")
        customer.classList.add("customer")

        customer.insertAdjacentHTML('beforeend', 
            `
                <div class="human"></div>
                <div class="demand">
                    <div class="food ${food_arr}"></div>
                </div>
            `)
        customers.appendChild(customer)

        customer.addEventListener(`click`, () => {
            const plate = Array.from(document.querySelectorAll(`.curent_ingredient`)).map(x => {
                return x.classList[2][10]
            }).sort((a,b)=>a-b).map(element => {
                return Number(element)
            })
            const demand = recepie_book[customer.childNodes[3].childNodes[1].classList[1]][0].sort((a,b)=>a-b).map(element => {
                return Number(element)
            })
    
            const isSame = JSON.stringify(demand) === JSON.stringify(plate);
            let price = 0
    
            for (const element in recepie_book) {
                if (JSON.stringify(demand) === JSON.stringify(recepie_book[element][0])) {
                    price = recepie_book[element][1]
                }
                
            }
            
            if (isSame) {
                happiness++
                change_happiness(happiness)
                money += price
                change_money(money)
            } else {
                unhappiness++
                change_unhappiness(unhappiness)
            }
    
            document.querySelectorAll(`.curent_ingredient`).forEach(ingredient => {
                ingredient.remove()
            })
            customer.remove()
        })
    } else {
        unhappiness++
        change_unhappiness(unhappiness)
    }
}

const game_events = () => {
    document.querySelectorAll(`.ingredient`).forEach((ingredient_element) => {
        const ingredient_content = ingredient_element.childNodes[0].textContent
        const parent_element = document.querySelector(`.preparation`)
        
        ingredient_element.addEventListener('click', () => {
            const ingredient_amount = ingredient_element.childNodes[1].textContent
            const number_of_elements = parent_element.children.length
            if (number_of_elements < 6 && Number(ingredient_amount) > 0) {
                ingredient_element.childNodes[1].textContent = Number(ingredient_amount) - 1
                parent_element.insertAdjacentHTML('afterbegin',
                 `<div class="curent_ingredient ing_c${number_of_elements + 1} ingredient${Number(Array.prototype.indexOf.call(ingredient_element.parentElement.children, ingredient_element)) + 1}">${ingredient_content}</div>`)
            } else {
                // FULLPLATE
            }
        })
    })

    if (day === 1) {
        document.querySelector(`.knife`).addEventListener('click', () => {
            const parent_element = document.querySelector(`.preparation`)
            if (parent_element.children.length > 0) {
                const ing = document.querySelector(`.ing${parent_element.firstElementChild.classList[2][10]}`)
                ing.childNodes[1].textContent = Number(ing.childNodes[1].textContent) + 1
                parent_element.removeChild(parent_element.firstElementChild)
            }
        })

        document.querySelector(`.recepie`).addEventListener('click', () => {
            document.querySelector(`.recepies`).classList.add('visible')
        })

        document.querySelector(`.recepie_back`).addEventListener('click', () => {
            document.querySelector(`.recepies`).classList.remove('visible')
        })
        
        document.querySelector(`.phone`).addEventListener('click', () => {
            let i = 0
            document.querySelectorAll(`.ingredient_amount`).forEach((ingredient_amount) => {
                if(ingredient_amount.textContent !== "") {
                    if (i == 0) {
                        ingredient_amount.textContent = Number(ingredient_amount.textContent) + 2
                    } else {
                        ingredient_amount.textContent = Number(ingredient_amount.textContent) + 1
                    }
                }
                i++
            })
        })

        document.querySelector(`.play`).addEventListener(`click`, () => {
            document.querySelector(`.shop`).classList.remove('visible')
            console.log(day);
            day++
            console.log(day, unhappiness, happiness);
            unhappiness = 0
            happiness = 0
            change_happiness(happiness)
            change_unhappiness(unhappiness)
            can_go = true
            console.log(day, unhappiness, happiness);
        })
    }
}

const load_shop = () => {
    document.querySelector(`.shop_shop`).innerHTML = ''
    document.querySelector(`.shop_shop`).insertAdjacentHTML('beforeend', `
        <h1>SHOP</h1>
        <h1 class="money_count">0$</h1>
        <div class="shop_part">
            <img src='/static/img/rice_pile.png'> <h1>Rice</h1> <button class="rice_btn shop_btn">${learned_ingredients.includes('rice') ? `Upgrade ${upgrade.rice}$` : 'Buy 5$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/kelp_pile.png'> <h1>kelp</h1> <button class="kelp_btn shop_btn">${learned_ingredients.includes('kelp') ? `Upgrade ${upgrade.kelp}$` : 'Buy 10$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/fish_pile.png'> <h1>fish</h1> <button class="fish_btn shop_btn">${learned_ingredients.includes('fish') ? `Upgrade ${upgrade.fish}$` : 'Buy 20$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/bamboo_pile.png'> <h1>bamboo</h1> <button class="bamboo_btn shop_btn">${learned_ingredients.includes('bamboo') ? `Upgrade ${upgrade.bamboo}$` : 'Buy 100$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/vegetable_pile.jpg'> <h1>vegetable</h1> <button class="vegetable_btn shop_btn">${learned_ingredients.includes('vegetable') ? `Upgrade ${upgrade.vegetable}$` : 'Buy 200$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/caviar_pile.png'> <h1>caviar</h1> <button class="caviar_btn shop_btn">${learned_ingredients.includes('caviar') ? `Upgrade ${upgrade.caviar}$` : 'Buy 500$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/meat_pile.jpg'> <h1>meat</h1> <button class="meat_btn shop_btn">${learned_ingredients.includes('meat') ? `Upgrade ${upgrade.meat}$` : 'Buy 1000$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/crab_pile.jpg'> <h1>crab</h1> <button class="crab_btn shop_btn">${learned_ingredients.includes('crab') ? `Upgrade ${upgrade.crab}$` : 'Buy 2000$'}</button>
        </div>
        <div class="shop_part">
            <img src='/static/img/catfish_pile.jpg'> <h1>catfish</h1> <button class="catfish_btn shop_btn">${learned_ingredients.includes('catfish') ? `Upgrade ${upgrade.catfish}$` : 'Buy 5000$'}</button>
        </div>
        <hr>
    `)
    change_money(money)
    document.querySelectorAll(`.shop_btn`).forEach(btn => {
        btn.addEventListener(`click`, () => {
            const buy = btn.textContent.includes('Buy') ? true : false
            const food_type = btn.classList[0].replace('_btn', '')
            const value = upgrade[food_type]
            console.log(buy, value, food_type, btn);

            if (buy && money >= value) {
                console.log('buy');
                learned_ingredients.push(food_type)
                upgrade[food_type] += upgrade[food_type]
                money -= value
                change_money(money)
                document.querySelector(`.${food_type}_btn`).textContent = `Upgrade ${upgrade[food_type]}$`
            } else if (money >= value){
                console.log('upgrade');
                findRecipesByIngredient(food_type, recepie_book).forEach(recepie => {
                    recepie_book[recepie][1] += value
                })
                upgrade[food_type] += upgrade[food_type]
                money -= value
                change_money(money)
                document.querySelector(`.${food_type}_btn`).textContent = `Upgrade ${upgrade[food_type]}$`
            }
        })
    })
}

const end_round = () => {
    console.log('end_round');
    if (unhappiness >= 3) {
        document.querySelector(`.lost`).classList.add('visible')
    }
    document.querySelector(`.recepies`).remove()
    document.querySelector(`.ingredients`).innerHTML = ""
    document.querySelector(`.shop`).classList.add('visible')
    load_shop()
}

const round = (learned_ingredients) => {
    can_go = false
    console.log('available', findAvailableRecipes(learned_ingredients));
    document.querySelector(`.ingredients`).insertAdjacentHTML('beforeend', `
        <div class="ingredient ing1"><img src="${learned_ingredients.includes('rice') ? '/static/img/rice.jpg' : '/staticimg/empty.jpg'}"><p class="ingredient_amount">2</p></div>
        <div class="ingredient ing2"><img src="${learned_ingredients.includes('kelp') ? '/static/img/kelp.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('kelp') ? '1' : ''}</p></div>
        <div class="ingredient ing3"><img src="${learned_ingredients.includes('fish') ? '/static/img/fish.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('fish') ? '1' : ''}</p></div>
        <div class="ingredient ing4"><img src="${learned_ingredients.includes('bamboo') ? '/static/img/bamboo.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('bamboo') ? '1' : ''}</p></div>
        <div class="ingredient ing5"><img src="${learned_ingredients.includes('vegetable') ? '/static/img/vegetable.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('vegetable') ? '1' : ''}</p></div>
        <div class="ingredient ing6"><img src="${learned_ingredients.includes('caviar') ? '/static/img/caviar.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('caviar') ? '1' : ''}</p></div>
        <div class="ingredient ing7"><img src="${learned_ingredients.includes('meat') ? '/static/img/meat.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('meat') ? '1' : ''}</p></div>
        <div class="ingredient ing8"><img src="${learned_ingredients.includes('crab') ? '/static/img/crab.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('crab') ? '1' : ''}</p></div>
        <div class="ingredient ing9"><img src="${learned_ingredients.includes('catfish') ? '/static/img/catfish.jpg' : '/static/img/empty.jpg'}"><p class="ingredient_amount">${learned_ingredients.includes('catfish') ? '1' : ''}</p></div>
    `)

    const recepies =  findAvailableRecipes(learned_ingredients)

    const recepies_names = []

    recepies.forEach(rec => {
        const recepies_description = []

        recepie_book[rec][0].forEach(food => {
            recepies_description.push(
                `
                    <p class="${image_numbers[food - 1]}_pile"></p>
                `
            )
        })

        recepies_names.push(
        `
            <div class="recepie_book">
                <h2 class="${rec} recepies_name"></h2>
                ${recepies_description.join("")}
            </div>
            <hr>
        `)
    })

    document.querySelector(`main`).insertAdjacentHTML('beforeend', `
    <div class="recepies">
        <h1>Recepies</h1>
        <div class="recepie_back"><h2 class="recepie_back">Back</h2></div>
        <div class="recepie_book">
            <h2>Food</h2>
            <p>Recepie</p>
        </div>
        <hr>
        ${recepies_names.join('')}
    </div>
    `)

    change_day(day)
    change_money(money)

    const frame = setInterval( () => {
        if(happiness < difficulty_table[day - 1][0] && unhappiness < 3){
            add_human(recepies[Math.floor(Math.random() * recepies.length)])
        } else {
            clearInterval(frame)
            end_round()
        }
    }, difficulty_table[day - 1][1])

    game_events()
}

const main = () => {

    if(can_go) {
        round(learned_ingredients)
    }
}

setInterval(main, 33)