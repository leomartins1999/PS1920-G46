class TestDto{

    constructor(id, name, description, age) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.age = age;
    }

    equals(obj){
        return this._id == obj._id && this.name == obj.name && this.description == obj.description && this.age == obj.age;
    }

}

module.exports = TestDto;