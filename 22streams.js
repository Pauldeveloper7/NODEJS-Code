//With streams , we can process data piece by piece instead of reading or writing the whole data at once 
//SOURCE FILE ---->READ STREAM--->READ BUFFER----->fs.readStream
//ADVANTAGE - 
//Streaming makes the data processing more efficient in terms of memory.Because there is no need to keep all the data in the memory
//In terms of performance & time also , streaming has its advantage because we can start processing data as soon as the first chunk of data arrives 
//there are 4 types streams in node.js
//1)READABLE STREAMS
//2)WRITABLE STREAMS
//3)DUPLEX STREAMS
//4)TRANSFORM STREAMS
//1------ READABLE STREAM -- The readable streams are the one from where we can read or consume data chunk by chunk 
//Example :Request stream 
//Read file stream
//IMPORTANT readable stream events 
//data & end 
//Important raedable stream methods 
//read & pipe  

//2) ------WRITABLE STREAMS --- The writable streams are the one to which we can write data chunk by chunk . it's the opposite of raedable streams 
//Example :
//Response Stream 
//Write file stream 
//Important readable streams events:
//drain & finish
//Important readable stream methods :
//write & end 
//Duplex  streams -----Duplex stream is simply a stream that is both readable & writable at the same time.
//Example :: Web sockets 
//Transform streams --- streams which can also modify or transform data as it is read or written 
//Example : zlib [used for compressing the data ] 