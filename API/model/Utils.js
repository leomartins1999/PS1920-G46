
module.exports = () => {
    return{
        checkFor: checkFor
    };

    function checkFor(obj, properties){
        for (let i = 0; i < properties.length ; i++)
            if (!obj[properties[i]]) return false;
        return true;
    }
};

