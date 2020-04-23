exports.statusCodeHandler = (errorCode) => {
    if (errorCode == "#E798" || errorCode == "#E200")
        return 400;
    else if (errorCode == "#E444")
        return 409;
    else
        return 500;
}