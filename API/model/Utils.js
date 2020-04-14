module.exports = (TYPE) => {
    return{
        checkFor: checkFor,
        cloneObject: cloneObject,
        getImageLink: getImageLink
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

    function getImageLink(id){
        return `/images/${TYPE}s/${id}`
    }
};

