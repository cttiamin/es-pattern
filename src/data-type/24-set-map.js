// es6 set 
{
  let list = new Set()
  list.add(5)
  list.add(7)
  // console.log(list.size)  // => 2
}

{
  let arr = [1, 2, 3, 4, 5]
  let list = new Set(arr)
  // console.log(list.size) // => 2
}

{
  let list = new Set()
  list.add(1)
  list.add(2)
  list.add(1)
  // console.log(list) // Set(2) {1, 2}

  let arr = [1, 2, 3, 1, '2']
  let list2 = new Set(arr)
  // console.log(list2) // {1, 2, 3, "2"}
}

// 删除，清空
{
  let arr = ['add', 'delete', 'clear', 'has']
  let list = new Set(arr)
  // console.log(list.has('add'))  // => true
  // console.log(list.delete('add'), list) 
  // => {"delete", "clear", "has"}
  // console.log(list.clear(), list) // => {}
}

// 遍历
{
  let arr = ['add', 'delete', 'clear', 'has']
  let list = new Set(arr)

  for (let key of list.keys()) {
    // console.log('keys', key)
  }
  for (let value of list.values()) {
    // console.log('value', value)
  }
  for (let [key, value] of list.entries()) {
    // console.log('entries', key, value)
  }

  list.forEach(function(item) {
    // console.log(item)
  })
}

// 存放对象，不能遍历
{
  let weakList = new WeakSet()
  let arg = {}
  weakList.add(arg)
  // weakList.add(2);
  // console.log('weakList', weakList)
}


///////////////////////////
// map 

{
  let map = new Map()
  let arr = ['123']
  map.set(arr, 456)
  // console.log(map, map.get(arr))
  // {Array(1) => 456} 456
}

{
  let map = new Map([['a', 123], ['b', 456]])
  // console.log( map)     // {"a" => 123, "b" => 456}
  // console.log(map.size) // 2
  // console.log(map.delete('a'), map) // true  {"b" => 456}
  // console.log(map.clear(), map) // undefined {}
}

{
  let weakmap = new WeakMap()
  let o = {}
  weakmap.set(o, 123)
  // console.log(weakmap.get(o))
}

/////////////////////////////////
// map set 与数组，对象比较
{
  let map = new Map()
  let set = new Set()
  let array = []
  //add
  map.set('t', 1)
  set.add({ t: 1 })
  array.push({ t: 1 })
  // console.log(map, set, array)
  // {"t" => 1} {} [{t: 2}]

  // 查
  let map_exist = map.has('t')
  let set_exist = set.has({ t: 1 })
  let array_exist = array.find(item => item.t)
  // console.info(map_exist, set_exist, array_exist)
  // rue false {t: 1}

  // 改
  map.set('t', 2)
  set.forEach(item => (item.t ? (item.t = 2) : ''))
  array.forEach(item => (item.t ? (item.t = 2) : ''))
  // console.info(map, set, array)
  // {"t" => 2}  0:{t: 2}  0:{t: 2}

  // delete
  // map.delete('t')
  // set.forEach(item => (item.t ? set.delete(item) : ''))
  // let index = array.findIndex(item => item.t)
  // array.splice(index, 1)
  // console.info('map-array', map, set, array)
}

/////////////////////////
// map set 与 object 比较
{
  let item = { t: 1 }
  let map = new Map()
  let set = new Set()
  let obj = {}

  // add
  map.set('t', 1)
  set.add(item)
  obj['t'] = 1
  console.log(map, set, obj)
  // {"t" => 1} {t:2} {t: 2}

  // 查
  // console.info({
  //   map_exist: map.has('t'),
  //   set_exist: set.has(item),
  //   obj_exist: 't' in obj
  // })

  //改
  map.set('t', 2)
  set.t = 2
  obj['t'] = 2
  // console.log('map-set-obj edit: ', map, set, obj)

  // del
  map.delete('t')
  set.delete(item)
  delete obj['t']
  // console.log('map-set-obj del: ', map, set, obj)
}
