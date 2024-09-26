const echo = (message: string, color: 'red'|'orange'|'green'|null = null) => {
    if (color !== null) {
        const code = {
            'red': 31,
            'orange': 33,
            'green': 32
        }[color];
        console.log("\x1b[0;" + code + "m" + message + "\x1b[0m");
    }
    else {
        console.log(message);
    }
}

export default {
    default: (message: any) => echo(message),
    green: (message: any) => echo(message, 'green'),
    orange: (message: any) => echo(message, 'orange'),
    red: (message: any) => echo(message, 'red'),
}
