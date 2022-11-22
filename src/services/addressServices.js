import localforage from "localforage";
import sortBy from "sort-by";


export async function getAddressOfContact(id) {
    await fakeNetwork(`getAddress:${id}`);
    let addresses = await localforage?.getItem("addresses");
    if (!addresses) addresses = [];
    let address = addresses.filter(address => address.contactId === id);
    return address.sort(sortBy("last", "createdAt"))
}

export async function getAddresses(query) {
    await fakeNetwork(`getAddresses:${query}`);
    let addresses = await localforage.getItem("addresses");
    if (!addresses) addresses = [];
    return addresses.sort(sortBy("last", "createdAt"))
}

export async function createAddress(contactId) {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2,9);
    let address = {id, createdAt: Date.now(), contactId: contactId}
    let addresses = await getAddresses();
    if (addresses){
        addresses.unshift(address)
        await set(addresses)
    }else {
        await set(address)
    }
    return address;
}

export async function deleteAddress(addressId) {
    let addresses = await localforage.getItem("addresses")
    let index = addresses.findIndex(address => address.id == addressId)
    if (index > -1){
        addresses.splice(index, 1);
        await set(addresses);
        return true;
    }
    return false;
}

function set(addresses) {
    return localforage.setItem("addresses", addresses)
}
// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
      fakeCache = {};
    }
  
    if (fakeCache[key]) {
      return;
    }
  
    fakeCache[key] = true;
    return new Promise(res => {
      setTimeout(res, Math.random() * 800);
    });
  }