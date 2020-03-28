function evaluate(commands, registersString) {
  var registers = []
  registersString.forEach(register => { registers.push(parseInt(register)); });

  var pointer = 0;

  while (pointer < commands.length) {
    let command = commands[pointer];

    if (command[0] === 'S') {
      registerString = command.split('(')[1];
      registerString = registerString.split(')')[0];
      registerId = parseInt(registerString)
      registerId--;
      registerValue = registers[registerId] !== undefined ? registers[registerId] : 0
      registerValue++;
      registers[registerId] = registerValue;
      pointer++;
      continue;
    }

    if (command[0] === 'Z') {
      registerString = command.split('(')[1];
      registerString = registerString.split(')')[0];
      registerId = parseInt(registerString)
      registerId--;;
      registers[registerId] = 0;
      pointer++;
      continue;
    }

    if (command[0] === 'T') {
      registersString = command.split('(')[1];
      registersString = registersString.split(')')[0];
      registersString = registersString.split(',')
      registerId1 = parseInt(registersString[0]);
      registerId1--;
      registerId2 = parseInt(registersString[1]);
      registerId2--;
      registerValue = registers[registerId1] !== undefined ? registers[registerId1] : 0
      registers[registerId2] = registerValue;
      pointer++;
      continue;
    }

    if (command[0] === 'J') {
      registersString = command.split('(')[1];
      registersString = registersString.split(')')[0];
      registersString = registersString.split(',')
      console.log(registersString);
      registerId1 = parseInt(registersString[0]);
      registerId1--;
      registerId2 = parseInt(registersString[1]);
      registerId2--;
      poinerValue = parseInt(registersString[2]);
      poinerValue--;
      registerValue1 = registers[registerId1] !== undefined ? registers[registerId1] : 0
      registerValue2 = registers[registerId2] !== undefined ? registers[registerId2] : 0

      if(registerValue1 === registerValue2) {
        pointer = poinerValue;
        continue;
      }

      pointer++;
      continue;
    }
  }
  console.log(registers[0]);
  return registers[0];
}


self.addEventListener('message', (e) => {
                                           self.postMessage(evaluate(e.data.commands, e.data.registers));
                                           self.close();
                                        })
