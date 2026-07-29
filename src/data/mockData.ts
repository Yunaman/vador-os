export interface MetricData {
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

export interface MetricOverview {
  revenue: MetricData;
  orders: MetricData;
  customers: MetricData;
  profit: MetricData;
  averageOrder: MetricData;
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  orders: number;
  profit: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
  stock: number;
  category: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: 'Completed' | 'Preparing' | 'Pending' | 'Refunded';
  time: string;
  tier: 'VIP' | 'Regular' | 'New';
}

export const mockMetrics: MetricOverview = {
  revenue: {
    value: '$142,850.40',
    change: '+14.2%',
    trend: 'up',
    description: 'vs. previous month'
  },
  orders: {
    value: '8,420',
    change: '+18.5%',
    trend: 'up',
    description: 'vs. previous month'
  },
  customers: {
    value: '3,842',
    change: '+12.1%',
    trend: 'up',
    description: 'vs. previous month'
  },
  profit: {
    value: '$48,569.12',
    change: '+15.8%',
    trend: 'up',
    description: 'vs. previous month'
  },
  averageOrder: {
    value: '$16.96',
    change: '-2.4%',
    trend: 'down',
    description: 'vs. previous month'
  }
};

export const mockMonthlyPerformance: ChartDataPoint[] = [
  { name: 'Jan', revenue: 94000, orders: 5500, profit: 32000 },
  { name: 'Feb', revenue: 102000, orders: 6000, profit: 35000 },
  { name: 'Mar', revenue: 115000, orders: 6800, profit: 39000 },
  { name: 'Apr', revenue: 108000, orders: 6400, profit: 37000 },
  { name: 'May', revenue: 125000, orders: 7400, profit: 42000 },
  { name: 'Jun', revenue: 138000, orders: 8100, profit: 47000 },
  { name: 'Jul', revenue: 142850, orders: 8420, profit: 48569 },
];

export const mockDailyPerformance = [
  { name: '07:00 AM', revenue: 3200, orders: 190 },
  { name: '09:00 AM', revenue: 8400, orders: 520 },
  { name: '11:00 AM', revenue: 6800, orders: 410 },
  { name: '01:00 PM', revenue: 5900, orders: 360 },
  { name: '03:00 PM', revenue: 7200, orders: 440 },
  { name: '05:00 PM', revenue: 4900, orders: 300 },
  { name: '07:00 PM', revenue: 3500, orders: 220 },
];

export const popularProducts: ProductPerformance[] = [
  { name: 'Vador Signature Nitro Brew', sales: 1420, stock: 120, category: 'Beverages', status: 'In Stock', revenue: 11360 },
  { name: 'Spanish Latte (Iced/Hot)', sales: 1280, stock: 85, category: 'Beverages', status: 'In Stock', revenue: 9600 },
  { name: 'Pistachio Croissant', sales: 940, stock: 12, category: 'Bakery', status: 'Low Stock', revenue: 6110 },
  { name: 'Flat White Arabica', sales: 860, stock: 240, category: 'Beverages', status: 'In Stock', revenue: 5160 },
  { name: 'Avocado Sourdough Toast', sales: 620, stock: 8, category: 'Food', status: 'Low Stock', revenue: 7440 },
  { name: 'Espresso Macchiato', sales: 510, stock: 350, category: 'Beverages', status: 'In Stock', revenue: 2550 },
  { name: 'Eton Mess Cruffin', sales: 480, stock: 0, category: 'Bakery', status: 'Out of Stock', revenue: 3360 }
];

export const recentOrders: RecentOrder[] = [
  { id: '1042', customer: 'Harrison Ford', items: '2x Espresso Macchiato, 1x Eton Mess Cruffin', total: '$18.40', status: 'Preparing', time: '2m ago', tier: 'VIP' },
  { id: '1041', customer: 'Sophia Loren', items: '1x Spanish Latte, 1x Avocado Sourdough', total: '$19.50', status: 'Completed', time: '8m ago', tier: 'Regular' },
  { id: '1040', customer: 'Marcus Aurelius', items: '1x Nitro Brew, 1x Pistachio Croissant', total: '$14.50', status: 'Completed', time: '14m ago', tier: 'VIP' },
  { id: '1039', customer: 'Clara Oswald', items: '4x Flat White (Catering Pack)', total: '$342.50', status: 'Completed', time: '35m ago', tier: 'New' },
  { id: '1038', customer: 'Lando Calrissian', items: '1x Filter Coffee (Ethiopia)', total: '$6.50', status: 'Refunded', time: '1h ago', tier: 'Regular' },
];

export interface InventoryAlert {
  id: string;
  item: string;
  current: string;
  required: string;
  unit: string;
  status: 'critical' | 'warning';
}

export const inventoryAlerts: InventoryAlert[] = [
  { id: 'ia1', item: 'Single Origin Ethiopia Yirgacheffe Beans', current: '4.2', required: '10.0', unit: 'kg', status: 'critical' },
  { id: 'ia2', item: 'Oat Milk (Barista Edition)', current: '15', required: '50', unit: 'Liters', status: 'warning' },
  { id: 'ia3', item: 'Pistachio Butter Sauce', current: '1.2', required: '5.0', unit: 'kg', status: 'critical' },
  { id: 'ia4', item: 'Vador Recyclable Hot Cups (12oz)', current: '450', required: '2000', unit: 'Units', status: 'warning' },
];

export const aiInsights = [
  {
    id: 'ai1',
    title: 'Smart Scheduling & Staffing Opt',
    description: 'Morning rush pattern detected. Shift 07:00 AM - 10:00 AM is understaffed by 1 barista. Adding 1 team member will likely increase throughput by +11.4%.',
    impact: '+11.4% Throughput',
    confidence: '94%'
  },
  {
    id: 'ai2',
    title: 'Dynamic Butter-Sauce Pricing',
    description: 'Pistachio Croissants demand is outstripping supply. An automatic 5% price optimization is recommended to balance baking constraints with yield.',
    impact: '+$450 weekly profit',
    confidence: '89%'
  },
  {
    id: 'ai3',
    title: 'Signature Beans Replenishment Alert',
    description: 'Inventory levels of Ethiopia Yirgacheffe Beans suggest a total depletion in 48 hours. Vador AI prepared a draft restock order with Supplier A.',
    impact: 'Avoid Out-of-Stock cost',
    confidence: '98%'
  }
];
