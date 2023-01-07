// modulos externos
const chalk = require('chalk')
const inquirer = require('inquirer')

//modulos internos
const fs = require('fs')


console.log('Iniciamos o Accounts')

operation()

function operation(){

    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices:[
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }
]).then(answer=>{
    const action = answer.action
    if (action === "Criar Conta") {
        createAccount()
    }
    else if (action ==='Depositar') {
        deposit()
    }
    else if (action === 'Consultar Saldo') {
        getAccountBalance()
    }
    else if (action === 'Sacar') {
        withdraw()
    }
    else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o accounts'))
        process.exit()
    }
}).catch(err=>console.log(err))
}

// create account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            message:'Digite um nome para a sua conta:'
        }
    ])
    .then(ans=>{
        const accountName = ans.accountName
        console.info(accountName)
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }
        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(
                chalk.bgRed.black('Esta conta já existe, escolha outro nome')
                )
                buildAccount()
                return
        }

        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance":0}',
        function (err){console.log(err)}
        )
        console.log(chalk.green("Parabéns, a sua conta foi criada com sucesso!"))
        operation()
    })
    .catch(err=>console.log(err))
}

// ad an amount to user account

function deposit(){
    inquirer.prompt([
        {
            name:'accountName',
            message:'Qual o nome da sua conta ?'
        }
    ])
    .then(
        ans=>{
            const accountName = ans.accountName
            //verify if account exists
            if(!checkAccount(accountName)){
                return deposit()
            }
            inquirer.prompt([
                {
                    name:'amount',
                    message:'Quanto você deseja depositar?'
                }
            ])
            .then(ans=>{
                const amount = ans.amount
                //add an amount
                addAmount(accountName, amount)
                operation()
            })
            .catch(err=>console.log(err))
        }
    )
    .catch(err=>console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
}

function addAmount(accountName,amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde"))
        return deposit()
    }

    accountData.balance += parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`
    ,JSON.stringify(accountData),
    function (err){console.log(err)}
    )

    console.log(chalk.green(`Foi depositado R$${amount} na sua conta`))

}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{encoding:'utf8', flag:'r'})

    return JSON.parse(accountJSON)
}

// show account balance
function getAccountBalance(){
    inquirer.prompt(
        [
            {
                name:'accountName',
                message:'Qual o nome da sua conta?'
            }
        ]
    )
    .then(ans=>{
        const accountName = ans.accountName
        //verify if account exists
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$${accountData.balance}`))
        operation()

    })
    .catch(err=>console.log(err))
}

// withdraw an amount from an user's account
function withdraw(){
    inquirer.prompt(
        [
            {
                name:'accountName',
                message:'Qual o nome da sua conta ?'
            }
        ]
    )
    .then(
        ans=>{
            const accountName = ans.accountName
            if(!checkAccount(accountName)){
                return withdraw()
            }

            inquirer.prompt(
                [
                    {
                        name:'amount',
                        message:'Quanto você deseja sacar?'
                    }
                ]
            )
            .then(ans=>{
                const amount = ans.amount
                removeAmount(accountName,amount)
            })
            .catch(
                err=>console.log(err)
            )
        }
    )
    .catch(err=>console.log(err))
}

function removeAmount(accountName,amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return withdraw()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Valor indisponível'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )
    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`))
    operation()
}