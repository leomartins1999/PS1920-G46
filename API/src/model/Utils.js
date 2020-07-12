// responsible for exporting some utility methods

module.exports = () => {
    return{
        checkFor: checkFor,
        filter: filter,
        cloneObject: cloneObject,
        getImageLink: getImageLink
    };

    /**
     * Checks if the object has the given properties
     * @param obj object to be checked
     * @param properties property names to be verified
     * @returns {boolean} true if the object has all properties; false otherwise
     */
    function checkFor(obj, properties){
        for (let i = 0; i < properties.length ; i++)
            if (!obj[properties[i]]) return false;
        return true;
    }

    /**
     * filters the object, returning another instance only with
     * the properties mentioned in the filter
     * @param obj object to be filtered
     * @param filter array of property names
     * @returns obj filtered object
     */
    function filter(obj, filter){
        let res = {};

        for(let i = 0; i < filter.length; i++){
            let name = filter[i];
            if (obj.hasOwnProperty(name)) res[name] = obj[name]
        }

        return res
    }

    /**
     * Copies all the properties from one object to another
     * @param to destination object
     * @param from origin object
     */
    function cloneObject(to, from){
        if (!from) return;

        for(let propertyName in from)
            to[propertyName] = from[propertyName];
    }

    /**
     * Generates the standard image link for a specific
     * type and id
     * @param type image's type
     * @param id image's id
     * @returns {string} the new image link
     */
    function getImageLink(type, id){
        return `/images/${type}/${id}`
    }
};

