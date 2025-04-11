export const books = [
    {
      id: 1,
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      price: 80000,
      originalPrice: 100000,
      categoryId: 1,
      image: new URL('../assets/dac-nhan-tam.jpg', import.meta.url).href,
      description: "Nghệ thuật thu phục lòng người"
    },
    {
      id: 2,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      price: 75000,
      categoryId: 1,
      image: new URL('../assets/nha-gia-kim.jpg', import.meta.url).href,
      description: "Hành trình tìm kiếm vận mệnh"
    },
    {
      id: 3,
      title: "Tôi Tài Giỏi Bạn Cũng Thế",
      author: "Adam Khoo",
      price: 90000,
      categoryId: 3,
      image: new URL('../assets/toi-tai-gioi-ban-cung-the.jpg', import.meta.url).href,
      description: "Phương pháp học tập hiệu quả"
    },
    {
      id: 4,
      title: "Bắt Trẻ Đồng Xanh",
      author: "J.D. Salinger",
      price: 70000,
      categoryId: 1,
      image: new URL('../assets/bat-tre-dong-xanh.jpg', import.meta.url).href,
      description: "Tác phẩm kinh điển về tuổi trẻ"
    },
    // Thêm ít nhất 10 cuốn sách khác
    {
      id: 15,
      title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      author: "Rosie Nguyễn",
      price: 85000,
      categoryId: 3,
      image: new URL('../assets/tuoi-tre-dang-gia-bao-nhieu.jpg', import.meta.url).href,
      description: "Sống trọn vẹn tuổi trẻ"
    }
  ]
  
  export const categories = [
    { id: 1, name: "Văn học" },
    { id: 2, name: "Kinh tế" },
    { id: 3, name: "Kỹ năng sống" },
    { id: 4, name: "Khoa học công nghệ" }
  ]