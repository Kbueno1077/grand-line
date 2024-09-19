import { Earth, Github, Linkedin, User2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full  py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Earth strokeWidth={1} className="mr-2" />
                        <span className="text-lg font-semibold">
                            GrandLine Maps
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                        <p className="text-sm mb-2 md:mb-0 md:mr-4">
                            Powered by{" "}
                            <a
                                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                target="_blank"
                                className="font-bold hover:text-primary transition-colors"
                                rel="noreferrer"
                            >
                                Supabase
                            </a>
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/Kbueno1077"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                                rel="noreferrer"
                            >
                                <Github size={20} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/kevin-bueno-0a8809218/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>

                            <a
                                href="https://www.kbueno-studio.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                <User2 size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center text-xs">
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved 🤣
                    </p>
                </div>
            </div>
        </footer>
    );
}
