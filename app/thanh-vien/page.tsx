"use client";

import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { Users, Bot, Sparkles, Code, Video, MessageSquare } from "lucide-react";

const members = [
  { id: "SE183713", name: "Trương Bảo Ngọc", role: "Leader" },
  { id: "SE184410", name: "Trương Tấn Triệu", role: "Member" },
  { id: "SE182524", name: "Trương Phúc Lộc", role: "Member" },
 
];

const aiTools = [
  {
    name: "NotebookLM",
    description: "Kiểm duyệt nội dung, Tạo video tổng hợp kiến thức cho trang web",
    icon: Video,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "ChatGPT",
    description: "Hỗ trợ lên kế hoạch thiết kế trang web",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    name: "GitHub Copilot",
    description: "Hỗ trợ trong việc thiết kế và phát triển trang Web",
    icon: Code,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    name: "Gemini AI",
    description: "Hỗ trợ chức năng chat box AI của trang Web",
    icon: Sparkles,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
];

export default function ThanhVienPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 border border-stone-100">
          <PageHeader
            title="Nhóm thực hiện & Báo cáo AI"
            description="Danh sách thành viên và các công cụ AI hỗ trợ dự án"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Members Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-stone-100"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
              <div className="p-3 bg-[#A61F2B]/10 rounded-xl">
                <Users className="text-[#A61F2B]" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Thành viên nhóm</h2>
            </div>
            
            <div className="space-y-4">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-100"
                >
                  <div>
                    <h3 className="font-bold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.id}</p>
                  </div>
                  {member.role === "Leader" && (
                    <span className="px-3 py-1 text-xs font-bold text-[#A61F2B] bg-[#A61F2B]/10 rounded-full">
                      Leader
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Report Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-stone-100"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Bot className="text-blue-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Báo cáo sử dụng AI</h2>
            </div>

            <div className="space-y-4">
              {aiTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${tool.bg} shrink-0`}>
                      <tool.icon className={tool.color} size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{tool.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
