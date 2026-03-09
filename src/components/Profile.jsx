import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, Calendar, Shield, Package, Heart,
    LogOut, ChevronRight, Edit2, Key, MapPin,
    Bell, Activity, AlertCircle, CheckCircle2, ChevronDown,
    Star, Percent, Wallet, HelpCircle, Trash2, Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRef } from 'react';

const Profile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [activeSection, setActiveSection] = useState('Personal Info');
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    const personalRef = useRef(null);
    const securityRef = useRef(null);
    const ordersRef = useRef(null);
    const wishlistRef = useRef(null);

    const scrollToSection = (sectionName, ref) => {
        setActiveSection(sectionName);
        setTimeout(() => {
            if (ref.current) {
                const navHeight = 120; // Offset for the fixed navbar
                const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        }, 300); // Wait for accordion animation
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }
            try {
                const response = await fetch('http://localhost:5000/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    setProfileData(await response.json());
                } else if (response.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                }
            } catch (err) { console.error(err); }
            finally { setIsLoading(false); }
        };
        fetchProfile();
    }, [navigate]);

    // Data Loaders
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5000/api/user/wishlist', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json()).then(data => setWishlist(data)).catch(console.error);
            fetch('http://localhost:5000/api/user/orders', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json()).then(data => setOrders(data)).catch(console.error);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    if (isLoading) return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/5 border-t-brand-accent rounded-full animate-spin"></div>
        </div>
    );

    const sidebarItems = [
        { id: 'Personal Info', icon: User, label: 'Profile', ref: personalRef },
        { id: 'Order History', icon: Package, label: 'Order History', ref: ordersRef },
        { id: 'Wishlist', icon: Heart, label: 'Wishlist', ref: wishlistRef },
        { id: 'Security', icon: Shield, label: 'Security', ref: securityRef },
        { id: 'My Reviews', icon: Star, label: 'My Reviews' },
        { id: 'Help or Complaint', icon: HelpCircle, label: 'Help' },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-inter selection:bg-brand-accent selection:text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 md:px-12 pt-16 md:pt-40 pb-24">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <nav className="space-y-4">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => item.ref ? scrollToSection(item.id, item.ref) : setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${activeSection === item.id ? 'text-white' : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} className={activeSection === item.id ? 'text-brand-accent' : 'text-inherit'} strokeWidth={activeSection === item.id ? 2.5 : 2} />
                                    <span className={`text-sm font-bold ${activeSection === item.id ? 'font-black' : ''}`}>{item.label}</span>
                                </button>
                            ))}
                            <div className="pt-6 space-y-2">
                                <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white/40 hover:text-white transition-all">
                                    <LogOut size={20} strokeWidth={2} />
                                    <span className="text-sm font-bold">Log out</span>
                                </button>
                                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-brand-accent/60 hover:text-brand-accent transition-all">
                                    <Trash2 size={20} strokeWidth={2} />
                                    <span className="text-sm font-bold">Delete Account</span>
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 max-w-3xl">
                        <header className="mb-10">
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 font-syne text-white">PERSONAL DATA</h1>
                            <p className="text-sm text-white/40 max-w-md">Enter your personal data so that you do not have to fill it in manually when placing an order.</p>
                        </header>

                        <div className="space-y-4">
                            {/* Personal Info Accordion */}
                            <AccordionSection
                                ref={personalRef}
                                icon={<User size={20} />}
                                title="Personal Info"
                                isOpen={activeSection === 'Personal Info'}
                                onClick={() => setActiveSection(activeSection === 'Personal Info' ? '' : 'Personal Info')}
                            >
                                <PersonalInfoContent data={profileData} onUpdate={setProfileData} />
                            </AccordionSection>

                            {/* Security Accordion */}
                            <AccordionSection
                                ref={securityRef}
                                icon={<Shield size={20} />}
                                title="Security"
                                isOpen={activeSection === 'Security'}
                                onClick={() => setActiveSection(activeSection === 'Security' ? '' : 'Security')}
                            >
                                <PasswordTab />
                            </AccordionSection>

                            {/* Order History Accordion */}
                            <AccordionSection
                                ref={ordersRef}
                                icon={<Package size={20} />}
                                title="Order History"
                                isOpen={activeSection === 'Order History'}
                                onClick={() => setActiveSection(activeSection === 'Order History' ? '' : 'Order History')}
                            >
                                <OrdersTab orders={orders} />
                            </AccordionSection>

                            {/* Wishlist Accordion */}
                            <AccordionSection
                                ref={wishlistRef}
                                icon={<Heart size={20} />}
                                title="Wishlist"
                                isOpen={activeSection === 'Wishlist'}
                                onClick={() => setActiveSection(activeSection === 'Wishlist' ? '' : 'Wishlist')}
                            >
                                <WishlistTab wishlist={wishlist} />
                            </AccordionSection>

                            {['Contact Info', 'Delivery address', 'Interests', 'Additional Info'].map(title => (
                                <AccordionSection
                                    key={title}
                                    title={title}
                                    icon={<ChevronRight size={18} className="text-white/20" />}
                                    isOpen={activeSection === title}
                                    onClick={() => setActiveSection(activeSection === title ? '' : title)}
                                >
                                    <div className="py-8 text-center text-white/10 text-[10px] font-black uppercase tracking-[0.2em]">Section Coming Soon</div>
                                </AccordionSection>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const AccordionSection = React.forwardRef(({ icon, title, children, isOpen, onClick }, ref) => (
    <div ref={ref} className={`border border-white/5 rounded-[40px] overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[#111111] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10' : 'bg-white/5 hover:bg-white/10'}`}>
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between px-8 py-7 text-left group"
        >
            <div className="flex items-center gap-4 text-white">
                <div className={`transition-colors duration-300 ${isOpen ? 'text-brand-accent' : 'text-white'}`}>
                    {icon}
                </div>
                <span className="text-base font-black uppercase tracking-tight font-syne">{title}</span>
            </div>
            <ChevronDown size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-brand-accent' : 'text-white/20 group-hover:text-white'}`} />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    <div className="px-8 pb-10 border-t border-white/5 text-white/80">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
));

const PersonalInfoContent = ({ data, onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: data?.FirstName || '',
        lastName: data?.LastName || '',
        nickname: '',
        dob: '',
        gender: 'Not specified',
        country: 'United States'
    });
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ firstName: formData.firstName, lastName: formData.lastName })
            });
            if (response.ok) {
                onUpdate({ ...data, FirstName: formData.firstName, LastName: formData.lastName });
                alert('Saved successfully!');
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="pt-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="relative group">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-white/5 border-4 border-[#1A1A1A] shadow-xl">
                        <img src={`https://ui-avatars.com/api/?name=${data?.FirstName}+${data?.LastName}&background=fff&color=000&size=128`} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-1 right-1 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center border-2 border-black hover:bg-brand-accent hover:text-white transition-colors shadow-lg">
                        <Camera size={14} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
                <ProfileInput label="First Name" value={formData.firstName} onChange={v => setFormData({ ...formData, firstName: v })} />
                <ProfileInput label="Second Name" value={formData.lastName} onChange={v => setFormData({ ...formData, lastName: v })} />
                <ProfileInput label="Nickname" placeholder="Not specified" value={formData.nickname} onChange={v => setFormData({ ...formData, nickname: v })} />

                <ProfileInput label="Date of Birth" type="date" value={formData.dob} onChange={v => setFormData({ ...formData, dob: v })} />
                <ProfileSelect label="Gender" options={['Male', 'Female', 'Not specified']} value={formData.gender} onChange={v => setFormData({ ...formData, gender: v })} />
                <ProfileSelect label="Country" options={['United States', 'Sri Lanka', 'UK', 'Japan']} value={formData.country} onChange={v => setFormData({ ...formData, country: v })} />
            </div>

            <div className="flex justify-end gap-5 mt-12 pt-10 border-t border-white/5">
                <button className="px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl shadow-white/5 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

const ProfileInput = ({ label, value, onChange, type = "text", placeholder }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">{label}*</label>
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-[22px] px-6 text-sm font-bold text-white focus:border-white focus:bg-white/10 outline-none transition-all placeholder:text-white/10"
        />
    </div>
);

const ProfileSelect = ({ label, options, value, onChange }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">{label}*</label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-[22px] px-6 text-sm font-bold text-white focus:border-white focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer"
            >
                {options.map(o => <option key={o} value={o} className="bg-[#111111]">{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
        </div>
    </div>
);

const OrdersTab = ({ orders }) => (
    <div className="pt-8 space-y-4">
        {orders.length === 0 ? (
            <div className="text-center py-12">
                <Package size={40} className="mx-auto text-white/10 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">No orders found.</p>
            </div>
        ) : (
            orders.map(order => (
                <div key={order.OrderID} className="p-7 bg-white/5 rounded-[28px] border border-white/5 flex flex-wrap items-center justify-between gap-4 hover:border-white/20 transition-all">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1.5">Order #SH-{order.OrderID}</p>
                        <p className="text-sm font-black tracking-tight text-white">{new Date(order.CreatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Status</p>
                        <p className="text-[11px] font-black uppercase tracking-widest text-brand-accent">{order.Status}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Total</p>
                        <p className="text-xl font-black tracking-tighter text-white">${order.TotalAmount}</p>
                    </div>
                </div>
            ))
        )}
    </div>
);

const WishlistTab = ({ wishlist }) => (
    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {wishlist.length === 0 ? (
            <div className="col-span-full text-center py-12">
                <Heart size={40} className="mx-auto text-white/10 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Your Wishlist is empty.</p>
            </div>
        ) : (
            wishlist.map(item => (
                <div key={item.WishlistID} className="rounded-[32px] bg-white/5 border border-white/5 p-4 flex items-center gap-5 group hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                    <img src={item.ImageURL} alt={item.Name} className="w-20 h-20 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-tight mb-1 line-clamp-1 text-white">{item.Name}</h4>
                        <p className="text-lg font-black tracking-tighter text-brand-accent">${item.Price}</p>
                    </div>
                    <button className="ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-brand-accent transition-all">
                        <Heart size={16} fill="currentColor" />
                    </button>
                </div>
            ))
        )}
    </div>
);

const PasswordTab = () => {
    const [pwdData, setPwdData] = useState({ current: '', new: '', confirm: '' });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (pwdData.new !== pwdData.confirm) return alert('Passwords mismatch');
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: pwdData.current, newPassword: pwdData.new })
            });
            if (res.ok) alert('Password updated successfully!');
            else alert('Error updating password');
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="pt-8 space-y-6 max-w-sm">
            <ProfileInput label="Current Password" type="password" value={pwdData.current} onChange={v => setPwdData({ ...pwdData, current: v })} />
            <ProfileInput label="New Password" type="password" value={pwdData.new} onChange={v => setPwdData({ ...pwdData, new: v })} />
            <ProfileInput label="Confirm New Password" type="password" value={pwdData.confirm} onChange={v => setPwdData({ ...pwdData, confirm: v })} />
            <div className="pt-6">
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full py-5 bg-white text-black rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5 disabled:opacity-50"
                >
                    {loading ? 'PROCESSING...' : 'UPDATE PASSWORD'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
