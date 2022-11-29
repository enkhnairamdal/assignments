    //ondor jil
    const year = prompt ('jilee oruulnuu?')
    let message = year % 4 == 0 || year % 400 == 0 && year % 100 == 0 ? 'Ondor jil' : 'ondor jil bish'
    alert (message)
    //----------->