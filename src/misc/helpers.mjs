export function keyFromStdoutData(stdoutData) {
  if (Buffer.compare(stdoutData, Buffer.from('1b5b41', 'hex')) === 0) {
    return 'up';
  } else if (Buffer.compare(stdoutData, Buffer.from('1b5b42', 'hex')) === 0) {
    return 'down';
  } else if (Buffer.compare(stdoutData, Buffer.from('71', 'hex')) === 0) {
    return 'exit';
  } else if (Buffer.compare(stdoutData, Buffer.from('0d', 'hex')) === 0) {
    return 'enter';
  }
}
