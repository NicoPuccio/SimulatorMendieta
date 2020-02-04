function ctorSimulator()
{
  let simulator={
     pins: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     stack: [],
     pushInstruction: pushInstruction,
     next: next,
     execute: execute,
     instructions:[],
     pc:0
  };

  //simulator.pins.forEach((item) => console.log(item));


  function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function writeConsole(pin)
  {
    console.log(simulator.pins[pin]);
  }
  function changeRandomPinValue()
  {
    let r = getRandomInt(0,10);
    simulator.pins[r] = Math.random();
    console.log("Pin" + r + " = " + simulator.pins[r])
  }

  function pushInstruction(keyWord, pin)
  {
    simulator.stack.push(pin);
    simulator.stack.push(keyWord);
  }

  function next()
  {
    var result = simulator.instructions[(simulator.pc++)];
    simulator.pc=simulator.pc%simulator.instructions.length;
    return result;
  }

  function execute()
  {
    let instruction = simulator.next();
    switch (instruction.op_code) {
      case 'turn_on':
        simulator.pins[instruction.arg] = 1;
        break;
        case 'turn_off':
            simulator.pins[instruction.arg] = 0;
        break;
      default:

    }
  }
  //setInterval(changeRandomPinValue, 1000);
  return simulator;
};
