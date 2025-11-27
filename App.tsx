import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  Home, 
  Search, 
  Truck, 
  Menu, 
  Edit2, 
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  FileText,
  User,
  LogOut,
  Clock,
  HelpCircle,
  Shield,
  File,
  CheckCircle,
  AlertCircle,
  XCircle,
  Package,
  X,
  ArrowDownCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Types ---
interface Order {
  id: number;
  orderCode: string;
  containerNo: string;
  size: string;
  weight: number;
  amount: string;
  owner: string;
  phone: string;
  date: string;
  departure: string;
  destination: string;
  status: 'new' | 'processing' | 'done';
  note?: string; // Added note field
}

interface MonthlyRevenue {
  id: number;
  profession: string;
  totalOrders: number;
  revenue: string;
}

// --- Mock Data ---
const ORDERS: Order[] = [
  { id: 13, orderCode: 'SLT25110114633', containerNo: 'CMAU3779435', size: '22G0', weight: 20, amount: '218,160', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-01', departure: 'Cảng Cát Lái', destination: 'Cảng Container QT SP-ITC', status: 'new', note: 'Giao hàng trong giờ hành chính' },
  { id: 14, orderCode: 'SLT25110493944', containerNo: 'GMLU6234978', size: '22G0', weight: 20, amount: '395,280', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Tân Thuận', destination: 'Cảng Container QT SP-ITC', status: 'new', note: 'Hàng dễ vỡ, xin nhẹ tay' },
  { id: 15, orderCode: 'SLT25110447277', containerNo: 'MSCU3849324', size: '22G0', weight: 20, amount: '490,320', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Tổng Hợp Bình Dương', destination: 'Cảng Container QT SP-ITC', status: 'new', note: 'Gọi trước khi đến 30 phút' },
  { id: 16, orderCode: 'SLT25110463664', containerNo: 'GMLU7282762', size: '22G0', weight: 24, amount: '218,160', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Cát Lái', destination: 'Cảng Container QT SP-ITC', status: 'new' },
  { id: 17, orderCode: 'SLT25110497675', containerNo: 'EMCU6238579', size: '22G0', weight: 23, amount: '419,040', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Đồng Nai', destination: 'Cảng Container QT SP-ITC', status: 'new', note: 'Yêu cầu xe có sàn gỗ' },
  { id: 18, orderCode: 'SLT25110456055', containerNo: 'EMCU7348697', size: '22G0', weight: 20, amount: '17,331,840', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Quốc tế Gemadept', destination: 'Cảng Container QT SP-ITC', status: 'new' },
  { id: 19, orderCode: 'SLT25110453817', containerNo: 'CMAU3724289', size: '22G0', weight: 20, amount: '12,839,040', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Quy Nhơn', destination: 'Cảng Container QT SP-ITC', status: 'new' },
  { id: 20, orderCode: 'SLT25110417325', containerNo: 'NEGU0884627', size: '22G0', weight: 20, amount: '419,040', owner: 'CÔNG TY TNHH DV TM TÍN PHÁT', phone: '0918274654', date: '2025-11-04', departure: 'Cảng Sài Gòn', destination: 'Cảng Container QT SP-ITC', status: 'new' },
];

const REVENUE_DATA: MonthlyRevenue[] = [
  { id: 1, profession: 'HẠ BÃI', totalOrders: 31, revenue: '9,618,480' },
  { id: 2, profession: 'NÂNG CONTAINER', totalOrders: 15, revenue: '4,200,000' },
  { id: 3, profession: 'VẬN CHUYỂN NỘI BỘ', totalOrders: 8, revenue: '12,500,000' },
];

const PIE_DATA = [
  { name: 'Thành công', value: 23, color: '#4ade80' }, // green-400
  { name: 'Đang vận chuyển', value: 0, color: '#3b82f6' }, // blue-500
  { name: 'Chờ vận chuyển', value: 5, color: '#fbbf24' }, // amber-400
  { name: 'Đã hủy', value: 3, color: '#ef4444' }, // red-500
];

const TOTAL_STATS = [
  { label: 'Tổng đơn hàng', value: 31, icon: Package, color: 'text-gray-700', bg: 'bg-gray-100' },
  { label: 'Thành công', value: 23, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Đang vận chuyển', value: 0, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Chờ vận chuyển', value: 5, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  { label: 'Đã hủy', value: 3, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
];

// --- Components ---

const Header = () => (
  <header className="bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg sticky top-0 z-50">
    <div className="flex justify-between items-center h-14 px-4">
      {/* Logo Area */}
      <div className="flex items-center space-x-4">
        <div className="bg-white p-1 rounded-full">
           {/* Placeholder for Logo */}
           <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center font-bold text-xs">SLT</div>
        </div>
        <div className="flex flex-col">
           <span className="font-bold text-lg tracking-wide uppercase">Vietnam SmartHub Logistics</span>
           <span className="text-[10px] text-teal-100 uppercase tracking-widest">Trung tâm vận tải</span>
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center space-x-4 text-sm">
         <div className="hidden md:flex items-center space-x-1 bg-teal-800/30 px-3 py-1 rounded-md">
            <span className="font-medium">VN</span>
            <div className="w-4 h-4 rounded-full bg-red-600 border border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-yellow-400"></div>
            </div>
         </div>
         <div className="flex flex-col text-right hidden sm:block">
            <span className="text-xs font-mono opacity-80">MST: 280903</span>
            <span className="text-xs font-mono opacity-80">KHK</span>
         </div>
         <button className="p-1.5 hover:bg-teal-500 rounded-full transition-colors">
            <Settings size={20} />
         </button>
      </div>
    </div>

    {/* Sub Navigation Bar */}
    <div className="bg-teal-800 text-teal-100 text-xs md:text-sm flex overflow-x-auto">
      <div className="flex items-center px-4 py-2 bg-teal-900 border-t-2 border-white font-semibold whitespace-nowrap">
        <Home size={16} className="mr-2" />
        Tổng quan
      </div>
      <div className="flex items-center px-6 py-2 hover:bg-teal-700 cursor-pointer transition-colors whitespace-nowrap">
        <Search size={16} className="mr-2" />
        Tra cứu
      </div>
      <div className="flex items-center px-6 py-2 hover:bg-teal-700 cursor-pointer transition-colors whitespace-nowrap ml-auto">
        Danh mục chung
        <Settings size={14} className="ml-2" />
      </div>
    </div>
  </header>
);

const CompanyInfoCompact = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full flex flex-col justify-center">
    <div className="flex items-center gap-3 mb-2">
         <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shrink-0">
             <User size={20} />
         </div>
         <div className="min-w-0">
             <h3 className="font-bold text-gray-800 text-sm truncate">Công ty TNHH XNK</h3>
             <span className="text-[10px] text-teal-600 cursor-pointer flex items-center hover:underline">
                 <Edit2 size={8} className="mr-1" /> Cập nhật
             </span>
         </div>
    </div>
    
    <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
        <div className="flex items-center gap-2 truncate">
            <Mail size={12} className="text-gray-400 shrink-0" />
            <span className="truncate" title="duynguyen2454@gmail.com">duynguyen2454@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 truncate">
            <Phone size={12} className="text-gray-400 shrink-0" />
            <span>0942322454</span>
        </div>
    </div>
  </div>
);

const DashboardStatsBar = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 h-full flex items-center">
    <div className="w-full flex flex-row divide-x divide-gray-100 overflow-x-auto">
        {TOTAL_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
                <div key={idx} className="flex-1 px-4 py-2 flex items-center gap-3 min-w-[140px] first:pl-2">
                    <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={20} className={stat.color} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">{stat.label}</span>
                        <span className={`text-xl font-bold ${stat.color} leading-none mt-0.5`}>{stat.value}</span>
                    </div>
                </div>
            )
        })}
    </div>
  </div>
);

const PaymentModal = ({ order, onClose, onConfirm }: { order: Order, onClose: () => void, onConfirm: () => void }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <CheckCircle size={20} className="text-teal-200" />
            Xác nhận nhận đơn
          </h3>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Amount Card */}
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-teal-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
            <div className="flex justify-between items-baseline mb-3 relative z-10">
               <span className="text-xs text-teal-700 font-bold uppercase tracking-wider">Số tiền nhận</span>
               <span className="text-2xl font-bold text-teal-800">{order.amount} <span className="text-sm font-medium">VND</span></span>
            </div>
            <div className="h-px bg-teal-200 my-2"></div>
             <div className="flex justify-between items-center relative z-10">
               <span className="text-xs text-teal-600 font-medium">Pincode</span>
               <span className="font-mono font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-teal-100 shadow-sm">{order.orderCode}</span>
            </div>
          </div>

          {/* Route Details */}
          <div className="space-y-4 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
             <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 shadow-sm ring-2 ring-white" />
                <div className="flex-1">
                   <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Điểm đi</span>
                   <span className="font-semibold text-gray-800 text-sm leading-tight">{order.departure}</span>
                </div>
             </div>
             
             {/* Connector Line */}
             <div className="ml-[5px] w-px h-4 bg-gray-300 -my-2"></div>

             <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 shadow-sm ring-2 ring-white" />
                <div className="flex-1">
                   <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Điểm đến</span>
                   <span className="font-semibold text-gray-800 text-sm leading-tight">{order.destination}</span>
                </div>
             </div>

             <div className="pt-2 mt-2 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Clock size={14} className="text-gray-400" />
                   <span className="text-xs text-gray-500 font-medium">Ngày giao nhận:</span>
                </div>
                <span className="font-bold text-gray-800 text-sm">{order.date}</span>
             </div>
          </div>

          {/* Note - Read Only */}
          <div>
             <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Ghi chú</label>
             <div className={`w-full border rounded-lg p-3 text-sm transition-shadow ${order.note ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-gray-100 border-gray-200 text-gray-400 italic'}`}>
                {order.note ? (
                  <div className="flex items-start gap-2">
                    <FileText size={14} className="mt-0.5 shrink-0 opacity-70" />
                    <span>{order.note}</span>
                  </div>
                ) : (
                  "Không có ghi chú nào cho đơn hàng này."
                )}
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
           <button 
             onClick={onClose}
             className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors focus:ring-2 focus:ring-gray-200"
           >
             Hủy bỏ
           </button>
           <button 
             onClick={onConfirm}
             className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-700 shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center gap-2 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
           >
             <CheckCircle size={16} />
             Xác nhận ngay
           </button>
        </div>
      </div>
    </div>
  );
}

const OrdersTable = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Generate extended list for scrolling demonstration
  // We duplicate the mock data 8 times to create a long enough list to scroll
  const extendedOrders = React.useMemo(() => {
    return Array(8).fill(ORDERS).flat().map((order, index) => ({
      ...order,
      id: index + 1000, // Ensure unique IDs for rendering
      // Add slight variety to order code so they look distinct
      orderCode: `${order.orderCode}-${index}`
    }));
  }, []);

  const handleConfirmOrder = () => {
    if (selectedOrder) {
      // In a real app, this would be an API call
      alert(`Đã nhận đơn hàng ${selectedOrder.orderCode} thành công!`);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-lg shrink-0">
            <div className="flex items-center">
                <h2 className="text-base font-bold text-gray-800 flex items-center mr-3">
                    <Truck className="mr-2 text-teal-600" size={18}/>
                    Danh sách đơn hàng cần vận chuyển
                </h2>
            </div>
            <div className="flex items-center gap-3">
                <button className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors group">
                    <Bell size={18} className="text-gray-600 group-hover:text-teal-600 transition-colors" />
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 text-white text-[9px] flex items-center justify-center rounded-full border border-white">36</span>
                </button>
                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                <button className="text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center">
                    <LogOut size={14} className="mr-1 rotate-180" /> Chi tiết
                </button>
            </div>
        </div>
        
        {/* Scrollable Container with Fixed Height - Reduced to h-[400px] (~10 rows) */}
        <div className="overflow-y-auto custom-scrollbar h-[400px] relative">
            <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase sticky top-0 z-20 text-[11px] shadow-sm ring-1 ring-gray-200 ring-opacity-50">
                <tr>
                    <th className="px-3 py-2.5 border-b border-gray-200 w-10 text-center bg-gray-50">STT</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">Mã đơn hàng</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">Số container</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 w-16 text-center bg-gray-50">Kích cỡ</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 w-16 text-center bg-gray-50">Trọng lượng</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 text-right bg-gray-50">Số tiền</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">Tên chủ hàng</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 w-24 bg-gray-50">Ngày lấy hàng</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">Điểm đi</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">Điểm đến</th>
                    <th className="px-3 py-2.5 border-b border-gray-200 text-center sticky right-0 bg-gray-50 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)] z-30">Nhận đơn</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                {extendedOrders.map((order, index) => (
                    <tr key={order.id} className="hover:bg-teal-50/30 transition-colors group">
                    <td className="px-3 py-2 text-center text-gray-500">{index + 1}</td>
                    <td className="px-3 py-2 font-medium text-gray-700">{order.orderCode}</td>
                    <td className="px-3 py-2 text-gray-600">{order.containerNo}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{order.size}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{order.weight}</td>
                    <td className="px-3 py-2 text-right font-medium text-teal-600">{order.amount}</td>
                    <td className="px-3 py-2 text-gray-600 truncate max-w-[150px]" title={order.owner}>{order.owner}</td>
                    <td className="px-3 py-2 text-gray-600">{order.date}</td>
                    <td className="px-3 py-2 text-gray-600 truncate max-w-[150px]" title={order.departure}>{order.departure}</td>
                    <td className="px-3 py-2 text-gray-600 truncate max-w-[150px]" title={order.destination}>{order.destination}</td>
                    <td className="px-3 py-2 text-center sticky right-0 bg-white group-hover:bg-teal-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)]">
                        <button 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-teal-500 hover:bg-teal-600 text-white text-[9px] uppercase font-bold px-2 py-1 rounded shadow-sm transition-all transform active:scale-95"
                        >
                        Nhận
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
        <div className="bg-gray-50 p-2 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500 rounded-b-lg shrink-0">
            <span className="font-semibold text-teal-700 ml-1">Tổng số: {extendedOrders.length} đơn hàng</span>
            <span className="text-gray-400 italic flex items-center gap-1 mr-1">
                <ArrowDownCircle size={14} className="text-gray-300" />
                Cuộn để xem thêm
            </span>
        </div>

        {/* Modal */}
        {selectedOrder && (
            <PaymentModal 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)} 
                onConfirm={handleConfirmOrder} 
            />
        )}
    </div>
  );
};

const RevenueChart = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-full">
    <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-base">Tình trạng đơn hàng</h3>
        <span className="text-xs font-semibold text-gray-500 italic">Tổng: 31 đơn</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center flex-1">
        <div className="w-full md:w-1/2 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                >
                {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                />
            </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-xl font-bold text-gray-700">74%</span>
                <span className="block text-[9px] text-gray-400 uppercase">Thành công</span>
            </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-2 pl-0 md:pl-4 mt-2 md:mt-0">
            {PIE_DATA.map((entry, index) => (
                <div key={index} className="flex items-center text-xs">
                    <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-gray-600 flex-1">{entry.name}:</span>
                    <span className="font-bold text-gray-800">{entry.value}</span>
                </div>
            ))}
        </div>
    </div>
  </div>
);

const RevenueTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
        <div className="p-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-base">Doanh thu theo tháng</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-cyan-600 text-white uppercase text-xs">
                    <tr>
                        <th className="px-3 py-2 font-medium text-center">STT</th>
                        <th className="px-3 py-2 font-medium">Tác nghiệp</th>
                        <th className="px-3 py-2 font-medium text-center">Tổng</th>
                        <th className="px-3 py-2 font-medium text-right">Doanh thu</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                    {REVENUE_DATA.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2.5 text-center text-gray-500">{row.id}</td>
                            <td className="px-3 py-2.5 font-medium text-gray-700">{row.profession}</td>
                            <td className="px-3 py-2.5 text-center text-gray-600">{row.totalOrders}</td>
                            <td className="px-3 py-2.5 text-right font-bold text-teal-600">{row.revenue}</td>
                        </tr>
                    ))}
                    {[...Array(2)].map((_, i) => (
                         <tr key={`empty-${i}`} className="hover:bg-gray-50">
                             <td className="px-3 py-2.5 text-center text-gray-300">-</td>
                             <td className="px-3 py-2.5"></td>
                             <td className="px-3 py-2.5"></td>
                             <td className="px-3 py-2.5"></td>
                         </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)

const Footer = () => (
  <footer className="bg-slate-800 text-white mt-6">
    {/* Main Footer Content */}
    <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded bg-teal-600 flex items-center justify-center font-bold text-white text-lg shadow-lg border border-teal-400">SLT</div>
             <div>
                <h3 className="font-bold text-lg uppercase leading-none">SmartHub</h3>
                <span className="text-[10px] text-teal-400 uppercase tracking-widest">Logistics</span>
             </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Hệ thống quản lý vận tải thông minh, tối ưu hóa quy trình giao nhận hàng hóa và logistic toàn cầu. Đối tác tin cậy của doanh nghiệp Việt.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-bold text-base text-teal-400 uppercase tracking-wider">Thông tin liên hệ</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="text-teal-500 shrink-0 mt-0.5" size={18} />
              <span>Số 10, Đường 3/2, Quận 10, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-teal-500 shrink-0" size={18} />
              <span>(028) 3899 9999 - 1900 1234</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-teal-500 shrink-0" size={18} />
              <span>support@smarthublogistics.vn</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
           <h4 className="font-bold text-base text-teal-400 uppercase tracking-wider">Liên kết nhanh</h4>
           <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-teal-600 rounded-full group-hover:bg-teal-400"></div>Trang chủ</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-teal-600 rounded-full group-hover:bg-teal-400"></div>Tra cứu đơn hàng</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-teal-600 rounded-full group-hover:bg-teal-400"></div>Báo cáo & Thống kê</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-teal-600 rounded-full group-hover:bg-teal-400"></div>Hỗ trợ kỹ thuật</a></li>
           </ul>
        </div>

        {/* Working Hours / Legal */}
        <div className="space-y-4">
           <h4 className="font-bold text-base text-teal-400 uppercase tracking-wider">Giờ làm việc</h4>
           <div className="text-sm text-slate-300 space-y-2">
              <p className="flex justify-between border-b border-slate-700 pb-1"><span>Thứ 2 - Thứ 6:</span> <span className="font-mono text-teal-200">08:00 - 17:30</span></p>
              <p className="flex justify-between border-b border-slate-700 pb-1"><span>Thứ 7:</span> <span className="font-mono text-teal-200">08:00 - 12:00</span></p>
              <p className="flex justify-between text-slate-500"><span>Chủ nhật:</span> <span>Nghỉ</span></p>
           </div>
           <div className="pt-2">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded transition-colors uppercase tracking-wide shadow-lg">Gửi yêu cầu hỗ trợ</button>
           </div>
        </div>

      </div>
    </div>

    {/* Copyright Bar */}
    <div className="bg-slate-900 border-t border-slate-700 py-4">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
         <p>Bản quyền © 2022 - 2025 SLT. MST: 0274/2022/QTG</p>
         <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-slate-300 flex items-center gap-1"><Shield size={12}/> Điều khoản</a>
            <a href="#" className="hover:text-slate-300 flex items-center gap-1"><File size={12}/> Bảo mật</a>
            <a href="#" className="hover:text-slate-300 flex items-center gap-1"><HelpCircle size={12}/> Trợ giúp</a>
         </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans flex flex-col">
      <Header />

      <main className="max-w-[1920px] mx-auto p-3 md:p-4 space-y-4 flex-grow w-full">
        
        {/* TOP SECTION: Single Row Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 h-auto">
            {/* Stats Bar - Spans 9/12 cols */}
            <div className="xl:col-span-9 h-[90px]">
                 <DashboardStatsBar />
            </div>

            {/* Company Info - Spans 3/12 cols */}
            <div className="xl:col-span-3 h-[90px]">
                <CompanyInfoCompact />
            </div>
        </div>

        {/* MIDDLE SECTION: Main Data Table */}
        <div className="w-full">
            <OrdersTable />
        </div>

        {/* BOTTOM SECTION: Revenue & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RevenueTable />
            <RevenueChart />
        </div>

      </main>
      
      <Footer />
    </div>
  );
}