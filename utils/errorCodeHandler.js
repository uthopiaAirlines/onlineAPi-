exports.statusCodeHandler = (errorCode) => {
    if (errorCode == "#E798" || errorCode == "#E200")
        return 400;
    else if (errorCode == "#E444")
        return 409;
    else if (errorCode == "#E404")
        return 404;
    else
        return 500;
}