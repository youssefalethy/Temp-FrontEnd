export const columns = [
    {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (text) => `$${text.toFixed(2)}`, // Format price as currency
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
];

export const products = [
    {
        key: "1",
        name: "iPhone 13 Pro",
        price: 999,
        category: "Electronics",
    },
    {
        key: "2",
        name: "Samsung Galaxy S21",
        price: 799,
        category: "Electronics",
    },
    {
        key: "3",
        name: "Sony WH-1000XM4 Headphones",
        price: 350,
        category: "Electronics",
    },
    {
        key: "4",
        name: "Nike Air Max 270",
        price: 150,
        category: "Clothing",
    },
    {
        key: "5",
        name: "Adidas Ultraboost 21",
        price: 180,
        category: "Clothing",
    },
    {
        key: "6",
        name: "MacBook Pro 14-inch",
        price: 1999,
        category: "Electronics",
    },
    {
        key: "7",
        name: "Xiaomi Mi 11",
        price: 749,
        category: "Electronics",
    },
    {
        key: "8",
        name: "Dyson V11 Vacuum Cleaner",
        price: 599,
        category: "Appliances",
    },
    {
        key: "9",
        name: "Philips Sonicare Electric Toothbrush",
        price: 80,
        category: "Appliances",
    },
    {
        key: "10",
        name: "Levi's 501 Original Fit Jeans",
        price: 60,
        category: "Clothing",
    },
    {
        key: "11",
        name: "Bose SoundLink Revolve+ Bluetooth Speaker",
        price: 299,
        category: "Electronics",
    },
    {
        key: "12",
        name: "Ikea Hemnes 6-Drawer Dresser",
        price: 249,
        category: "Furniture",
    },
    {
        key: "13",
        name: "Amazon Echo Dot 4th Gen",
        price: 49,
        category: "Electronics",
    },
    {
        key: "14",
        name: "Razer Kraken Ultimate RGB Headset",
        price: 129,
        category: "Electronics",
    },
    {
        key: "15",
        name: "Samsung QLED 4K TV",
        price: 999,
        category: "Electronics",
    },
    {
        key: "16",
        name: "Bosch 500 Series Dishwasher",
        price: 899,
        category: "Appliances",
    },
    {
        key: "17",
        name: "LG OLED C1 55-Inch TV",
        price: 1799,
        category: "Electronics",
    },
    {
        key: "18",
        name: "Sony PlayStation 5",
        price: 499,
        category: "Electronics",
    },
    {
        key: "19",
        name: "KitchenAid Stand Mixer",
        price: 379,
        category: "Appliances",
    },
    {
        key: "20",
        name: "Herman Miller Aeron Chair",
        price: 1195,
        category: "Furniture",
    },
];
