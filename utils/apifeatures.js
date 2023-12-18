class apifeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    filter(){
     let querystring  = this.queryStr;
     querystring = querystring.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
     const queryobj = JSON.parse(querystring);
     this.query = this.query.find(queryobj);
     
       
    }
    sort(){
    if(this.queryStr.sort){
      const sortby = this.queryStr.sort.split(',').join(' ');
      this.query = query.sort(sortby);
    }
    else{
      this.query = this.query.sort('-createdAt');
        }
        return this 
    }
    limitfield(){
    if(this.queryStr.fields){
      const fields = this.queryStr.fields.split(',').join('')
      this.query = this.query.select(fields);
    }
    else{
      this.query = this.query.select('-__v');
    }
    return this
    }
    paginate(){
    const page = this.queryStr.page*1||1;
    const limit = this.queryStr.limit*1||10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // if(this.queryStr.page){
    //   const moviescount = await Movie.countDocuments();
    // }
    // if (skip>=moviescount){
    //     throw new Error ('This page is NOT FOUND');
    //   }
    // }
    return this 
}
}
module.exports = apifeatures;