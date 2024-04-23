#! /usr/bin/env node

import inquirer from "inquirer";

    let isRunning = true;
    let isOperationComplete = false;
    const UserDb = [
        {
            UserId: 1234,
            UserName: "Muhammad Owais",
            Pin: 1234,
            Balance: 5000
        },
        {
            UserId: 5678,
            UserName: "Sohail Ahsan",
            Pin: 5678,
            Balance: 8000
        }
    ]
    console.table(UserDb)
    while (isRunning) {
        const answer = await inquirer.prompt([
            {
                type: 'number',
                name: 'UserId',
                message: 'Enter the User Id: ',
                validate: (input: string) => !isNaN(parseFloat(input)),
            },
            {
                type: 'number',
                name: 'Pin',
                message: 'Enter the Pin: ',
                validate: (input: string) => !isNaN(parseFloat(input)),
            }
        ]);

        if (UserDb.find(x => x.UserId === answer.UserId && x.Pin === answer.Pin)) {
            const loggedInUser = UserDb.find(x => x.UserId === answer.UserId && x.Pin === answer.Pin);
            if (loggedInUser) {
                console.log("Welcome " + loggedInUser.UserName + "!");
                while (isOperationComplete===false)
                {
                    const choice = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'operation',
                            message: 'Select the operation you want to perform:',
                            choices: ['Check Balance', 'Deposit', 'Withdraw', "Quit"]
                        }
                    ]);
    
                    switch (choice.operation) {
                        case 'Check Balance':
                            console.log("Your current balance is: " + loggedInUser.Balance);
                            break;
    
                        case 'Deposit':
                            const deposit = await inquirer.prompt([
                                {
                                    type: 'number',
                                    name: 'amount',
                                    message: 'Enter the amount you want to deposit: ',
                                    validate: (input: string) => !isNaN(parseFloat(input)),
                                }
                            ]);
                            loggedInUser.Balance += deposit.amount;
                            console.log("Your current balance is: " + loggedInUser.Balance);
                            break;
    
                        case 'Withdraw':
                            const withdraw = await inquirer.prompt([
                                {
                                    type: 'number',
                                    name: 'amount',
                                    message: 'Enter the amount you want to withdraw: ',
                                    validate: (input: string) => !isNaN(parseFloat(input)),
                                }
                            ]);
                            if (loggedInUser.Balance >= withdraw.amount) {
                                loggedInUser.Balance -= withdraw.amount;
                                console.log("Your current balance is: " + loggedInUser.Balance);
                            }
                            else {
                                console.log("Insufficient Balance!");
                            }
                            break;
                        case 'Quit':
                            isRunning=false;
                            isOperationComplete=true;
                            break;
                    }
                }
               
            }
        }
    }