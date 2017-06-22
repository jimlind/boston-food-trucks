var Cheerio = require("cheerio");
var Request = require("request");
var FileSystem = require("fs");

class Data {
  constructor(filename) {
    this.filename = filename; 
  }

  getState(callback) {
    readTruckData(this.filename, (dataList) => {   
      callback({
        day: {
          selected: '', 
          list: buildUniqueDataList(dataList, 'day'),
        },
        neighborhood: {
          selected: '',
          list: buildUniqueDataList(dataList, 'neighborhood'),
        },
        time: {
          selected: '',
          list: buildUniqueDataList(dataList, 'time'),
        },
        food: [],
      });
    });
  }
  
  getTrucksByNeighborhoodAndDay(request, response) {
    const neighborhoodId = request.params.neighborhoodId;
    const day = request.params.day;
    const time = request.params.time;
    readTruckData(this.filename, (dataList) => {
      let returnData = [];
      dataList.forEach((dataPoint) => {
        if (makeId(dataPoint.neighborhood) == neighborhoodId && makeId(dataPoint.day) == day && makeId(dataPoint.time) == time) {
          returnData.push({
            location: dataPoint.location,
            truckList: dataPoint.truckList,
          })
        }
      });
      
      response.send(JSON.stringify(returnData));
    })
  }
  
  getAllNeighborhoods(request, response) {
    readTruckData(this.filename, (dataList) => {
      const neighborhoodList = buildUniqueDataList(dataList, 'neighborhood');      
      response.send(JSON.stringify(neighborhoodList));
    });
  }
  
  getAllDays(request, response) {
    readTruckData(this.filename, (dataList) => {
      const dayList = buildUniqueDataList(dataList, 'day');
      response.send(JSON.stringify(dayList));
    });
  }
  
  getAllTimes(request, response) {
    readTruckData(this.filename, (dataList) => {
      const timeList = buildUniqueDataList(dataList, 'time');      
      response.send(JSON.stringify(timeList));
    });
  }
}

function readTruckData(filename, callback) {
  FileSystem.readFile(filename, 'utf8', function (error, string) {
    if (error) throw error;
    callback(JSON.parse(string));
  });
}

function buildUniqueDataList(dataList, index) {
  let keyList = [];
  let returnList = [];
  dataList.forEach((dataPoint) => {
    const value = dataPoint[index];
    const key = makeId(value);
    if (-1 == keyList.indexOf(key) && key) {
      keyList.push(key);
      returnList.push({
        id: key,
        name: value,
      });
    }
  });
  return returnList;
}

function makeId(rawString) {
  const shortString = rawString.split(/[\(.,]/, 1)[0];
  return shortString.trim().toLowerCase().replace(/[^a-z]/g, '-');
}

module.exports = Data;