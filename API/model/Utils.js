
module.exports = () => {
    return{
        checkFor: checkFor,
        cloneObject: cloneObject
    };

    function checkFor(obj, properties){
        for (let i = 0; i < properties.length ; i++)
            if (!obj[properties[i]]) return false;
        return true;
    }

    function cloneObject(to, from){
        if (!from) return;

        for(let propertyName in from)
            to[propertyName] = from[propertyName];
    }
};

