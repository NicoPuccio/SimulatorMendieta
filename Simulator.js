function ctorSimulator()
{
  let simulator={
     pins: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     stack: [],
     next: next,
     execute: execute,
     loadInstructions: loadInstructions,
     instructions:[],
     pc:0
  };

  //simulator.pins.forEach((item) => console.log(item));


  function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function loadInstructions(newIns)
  {
    simulator.pc = 0;
    simulator.stack = [];
    simulator.instructions = newIns;
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

  function next()
  {
    simulator.pc = simulator.pc % simulator.instructions.length;
    var result = simulator.instructions[(simulator.pc++)];
    simulator.pc = simulator.pc % simulator.instructions.length;
    return result;
  }

  function execute()
  {

    let instruction = simulator.next();
    if(instruction == undefined)
    {
      throw "undefined found as instruction" ;
      simulator.pc=0;
    }
    switch (instruction.op_code) {
      case 'turn_on':
        simulator.pins[instruction.arg] = 1;
        break;
        case 'turn_off':
            simulator.pins[instruction.arg] = 0;
        break;
        case'write_pin':
        simulator.pins[instruction.arg] = simulator.stack.pop();
        break;
        case'read_pin':
        if (instruction.arg < 0 ) {
          instruction.arg = 0;
        }
        else if (instruction.arg > 1) {
          instruction.arg = 1;
        }
        simulator.stack.push(instruction.arg);
        break;
        case'read_global':
        throw "TO DO";
        break;
        case'write_global':
          throw "TO DO";
        break;
        case'script_start':
          throw "TO DO";
        break;
        case'script_resume':
          throw "TO DO";
        break;
        case'script_stop':
          throw "TO DO";
        break;
        case'script_pause':
          throw "TO DO";
        break;
        case'jmp':
          simulator.pc += instruction.arg;
        break;
        case'jz':
          if (simulator.stack.pop() == 0) {
              simulator.pc += instruction.arg;
          }
        break;
        case'jnz':
          if (simulator.stack.pop() != 0) {
            simulator.pc += instruction.arg;
          }
        break;
        case 'jne':
        {
        let a = simulator.stack.pop();
        let b = simulator.stack.pop();
        if (a != b) {
          simulator.pc += instruction.arg;
          }
        }
        break;
        case 'jlt':
        {
        let a = simulator.stack.pop();
        let b = simulator.stack.pop();
        if (a < b) {
          simulator.pc += instruction.arg;
          }
        }
        break;
        case 'jlte':
        {
        let a = simulator.stack.pop();
        let b = simulator.stack.pop();
        if (a <= b) {
          simulator.pc += instruction.arg;
        }
        }
        break;
        case 'jgt':
        {
        let a = simulator.stack.pop();
        let b = simulator.stack.pop();
        if (a > b) {
          simulator.pc += instruction.arg;
        }
        }
        break;
        case 'jgte':
        {
        let a = simulator.stack.pop();
        let b = simulator.stack.pop();
        if (a >= b) {
          simulator.pc += instruction.arg;
        }
        }
        break;
        case 'read_local':
        {
          throw "TO DO";
        }
        break;
      default:
    throw "Missing instruction "+instruction.op_code;

    }
  }
  //setInterval(changeRandomPinValue, 1000);
  return simulator;
};
