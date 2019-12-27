class BaseService {
  constructor(model) {
    this.model = model;
  }

  findOne(){
    this.model.findOne.apply(this.model, arguments);
  }

  findMany() {
    this.model.find.apply(this.model, arguments);
  }

  updateOne(query, update, cb) {
    this.model.update(query, update, cb);
  }

  findSkipAndSort({sort = {}, pageNum = 1, pageSize = 10, searchQuery} = {}, cb) {
    let skip = (pageNum - 1) * pageSize;
    // console.log(sort.salePrice);
    this.model
      .find(searchQuery)
      .skip(skip)
      .limit(pageSize)
      .sort(sort)
      .exec(cb);
  }
}


module.exports = BaseService;
