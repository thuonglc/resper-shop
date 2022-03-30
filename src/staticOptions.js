const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 24,
		},
		lg: {
			span: 24,
		},
		xl: {
			span: 24,
		},
	},
	wrapperCol: {
		xs: {
			span: 0,
		},
		sm: {
			span: 24,
		},
	},
}

const phoneType = [
	{
		value: 'android',
		label: 'Android',
	},
	{
		value: 'ios',
		label: 'iPhone (iOS)',
	},
	{
		value: 'standard',
		label: 'Điện thoại phổ thông',
	},
]

const phoneSc = [
	{
		value: 'min',
		label: 'Nhỏ gọn dễ cầm',
	},
	{
		value: 'standard',
		label: 'Từ 6 inch trở lên',
	},
	{
		value: 'fold',
		label: 'Màn hình gập',
	},
]

const phoneRam = [
	{
		value: '1',
		label: '1 GB',
	},
	{
		value: '2',
		label: '2 GB',
	},
	{
		value: '3',
		label: '3 GB',
	},
	{
		value: '4',
		label: '4 GB',
	},
	{
		value: '6',
		label: '6 GB',
	},
	{
		value: '8',
		label: '8 GB',
	},
	{
		value: '10',
		label: '10 GB',
	},
	{
		value: '12',
		label: '12 GB',
	},
]

const phoneRom = [
	{
		value: '8',
		label: '8 GB',
	},
	{
		value: '16',
		label: '16 GB',
	},
	{
		value: '32',
		label: '32 GB',
	},
	{
		value: '64',
		label: '64 GB',
	},
	{
		value: '128',
		label: '128 GB',
	},
	{
		value: '256',
		label: '256 GB',
	},
	{
		value: '512',
		label: '512 GB',
	},
]

const laptopRam = [
	{
		value: '4',
		label: '4 GB',
	},
	{
		value: '8',
		label: '8 GB',
	},
	{
		value: '16',
		label: '16 GB',
	},
	{
		value: '32',
		label: '32 GB',
	},
]

const laptopRom = [
	{
		value: 'ssd2tb',
		label: 'SSD 2 TB',
	},
	{
		value: 'ssd1tb',
		label: 'SSD 1 TB',
	},
	{
		value: 'ssd512',
		label: 'SSD 512 GB',
	},
	{
		value: 'ssd256',
		label: 'SSD 256 GB',
	},
	{
		value: 'hdd1tb',
		label: 'HDD 1 TB trở lên',
	},
]

const laptopSc = [
	{
		value: '133',
		label: '13.3 inch',
	},
	{
		value: '134',
		label: '13.4 inch',
	},
	{
		value: '135',
		label: '13.5 inch',
	},
	{
		value: '140',
		label: '14 inch',
	},
	{
		value: '156',
		label: '15.6 inch',
	},
	{
		value: '160',
		label: '16.1 inch',
	},
	{
		value: '161',
		label: '16.1 inch',
	},
	{
		value: '170',
		label: '17 inch',
	},
	{
		value: '173',
		label: '17.3 inch',
	},
]

const laptopCpu = [
	{
		value: 'ic7',
		label: 'Intel Core i7',
	},
	{
		value: 'ic5',
		label: 'Intel Core i5',
	},
	{
		value: 'ic3',
		label: 'Intel Core i3',
	},
	{
		value: 'icc',
		label: 'Intel Celeron /Pentium',
	},
	{
		value: 'amd',
		label: 'AMD',
	},
]

const laptopRes = [
	{
		value: '4k',
		label: '4K',
	},
	{
		value: '2k',
		label: '2K',
	},
	{
		value: 'retina',
		label: 'Retina',
	},
	{
		value: 'fullhd',
		label: 'Full HD',
	},
	{
		value: 'hd',
		label: 'HD',
	},
]

const smWatchPin = [
	{
		value: '48',
		label: 'Dưới 48 giờ',
	},
	{
		value: '205',
		label: 'Từ 2 - 5 ngày',
	},
	{
		value: '507',
		label: 'Từ 5 - 7 ngày',
	},
	{
		value: '714',
		label: 'Từ 7 - 14 ngày',
	},
	{
		value: '140',
		label: 'Trên 14 ngày',
	},
	{
		value: '999',
		label: 'Sạc bổ sung ánh sáng bằng năng lượng mặt trời',
	},
]

const smWatchFace = [
	{ value: 'rectangle', label: 'Hình chữ nhật' },
	{ value: 'square', label: 'Vuông' },
	{ value: 'circle', label: 'Tròn' },
]

const smWatchSc = [
	{ value: '4000', label: 'Dưới 40 mm' },
	{ value: '4040', label: '40 - 42 mm' },
	{ value: '4245', label: '42 - 45 mm' },
	{ value: '45', label: 'Trên 45 mm' },
]

const colorOptions = [
	{
		value: 'black',
		label: 'Đen',
		code: '#212121',
	},
	{
		value: 'pink',
		label: 'Hồng',
		code: '#e91e63',
	},
	{
		value: 'blue',
		label: 'Xanh dương',
		code: '#03a9f4',
	},
	{
		value: 'white',
		label: 'Trắng',
		code: '#e4e3e1',
	},
	{
		value: 'red',
		label: 'Đỏ',
		code: '#ff0000',
	},
	{
		value: 'yellow',
		label: 'Vàng',
		code: '#ffeb3b',
	},
	{
		value: 'green',
		label: 'Xanh lá',
		code: '#8bc34a',
	},
	{
		value: 'orange',
		label: 'Cam',
		code: '#ff9800',
	},
	{
		value: 'silver',
		label: 'Bạc',
		code: '#e0e0e0',
	},
	{
		value: 'purple',
		label: 'Tím',
		code: '#512da8',
	},
]

const tabletSc = [
	{ value: '78', label: 'Khoảng 7 - 8 inch' },
	{ value: '1011', label: 'Khoảng 10 - 11 inch' },
	{ value: '1200', label: 'Khoảng 12 inch trở lên' },
]

const tabletRam = [
	{
		value: '2',
		label: '2 GB',
	},
	{
		value: '3',
		label: '3 GB',
	},
	{
		value: '4',
		label: '4 GB',
	},
	{
		value: '6',
		label: '6 GB',
	},
	{
		value: '8',
		label: '8 GB',
	},
]

const tabletRom = [
	{
		value: '8',
		label: '8 GB',
	},
	{
		value: '16',
		label: '16 GB',
	},
	{
		value: '32',
		label: '32 GB',
	},
	{
		value: '64',
		label: '64 GB',
	},
	{
		value: '128',
		label: '128 GB',
	},
	{
		value: '256',
		label: '256 GB',
	},
]

const watchSex = [
	{ value: 'man', label: 'Nam' },
	{ value: 'woman', label: 'Nữ' },
	{ value: 'couple', label: 'Cặp đôi' },
	{ value: 'child', label: 'Trẻ em' },
]

const watchSc = [
	{ value: '29', label: 'Dưới 29 mm' },
	{ value: '2933', label: '29 - 33 mm' },
	{ value: '3337', label: '33 - 37 mm' },
	{ value: '3740', label: '37 - 40 mm' },
	{ value: '4042', label: '40 - 42 mm' },
	{ value: '4245', label: '42 - 45 mm' },
	{ value: '45', label: 'Trêm 45 mm' },
]

const paymentOptions = [
	{ value: 'cod', label: 'Thanh toán khi nhận hàng' },
	{ value: 'paypal', label: 'Paypal' },
	{ value: 'stripe', label: 'Stripe' },
	{ value: 'credit', label: 'Thẻ tín dụng/ghi nợ' },
	{ value: 'debit', label: 'Thẻ ATM nội địa (Internet Banking)' },
]

const statusOrder = [
	{ value: 'Not Processed', vn: 'Chưa thực hiện' },
	{ value: 'Processing', vn: 'Đang xử lý' },
	{ value: 'Dispatched', vn: 'Đang vận chuyển' },
	{ value: 'Cancelled', vn: 'Đã hủy' },
	{ value: 'Completed', vn: 'Hoàn thành' },
]

export {
	formItemLayout,
	phoneType,
	phoneSc,
	phoneRam,
	phoneRom,
	smWatchPin,
	smWatchFace,
	colorOptions,
	smWatchSc,
	laptopRam,
	laptopRom,
	laptopSc,
	laptopCpu,
	laptopRes,
	tabletSc,
	tabletRam,
	tabletRom,
	watchSex,
	watchSc,
	paymentOptions,
	statusOrder,
}
