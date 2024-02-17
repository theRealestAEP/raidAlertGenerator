'use client'

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default function Upload() {

    const supabaseUrl = 'https://vcoficzaxvqccchkrdke.supabase.co'; // Use NEXT_PUBLIC_ prefix for environment variables to expose them to the browser.
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb2ZpY3pheHZxY2NjaGtyZGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxMTg0NzEsImV4cCI6MjAyMzY5NDQ3MX0.JGWjoqWqBBqfhWruzsAm3aLPjf37h8ybm4GZGtT8v54';
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    const [uploading, setUploading] = useState(false);
    const [routePath, setRoutePath] = useState(''); // Change state variable name for clarity

    const handleUpload = async (event: any) => {
        try {
            setUploading(true);
            setRoutePath(''); // Reset route path on new upload

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            let random = crypto.randomBytes(16).toString('hex')
            const fileName = `${random}.${fileExt}`; // Unique file name
            const filePath = `uploads/${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('videos')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // After uploading, insert the video info into the database
            const { data, error } = await supabase
                .from('videos')
                .insert([{ title: file.name, url: filePath, unique_key: fileName }]);

            if (error) {
                console.error('Error saving video info:', error);
            }
            else {
                // Assuming the page to display the video is `/videos/[uniqueKey]`
                // Replace `/videos/` with your actual route if different
                const uniqueKey = fileName; // Assuming `unique_key` is returned in the inserted data
                setRoutePath(`/videos/${uniqueKey}`); // Set the route path to the new Next.js dynamic route
                alert('Upload successful');
            }
        } catch (error: any) {
            alert(`Upload failed: ${error.message}`);
            // console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        // <div className="flex items-center justify-center h-screen">
        <div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-auto">
                <div className="flex flex-col items-center space-y-2"> {/* reduced space-y from 4 to 2 */}
                    <input
                        type="file"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
                    />
                    {uploading && <p>Uploading...</p>}
                    {routePath && (
                        <div className="text-center space-y-1"> {/* reduced space-y from 4 to 1 */}
                            <p className="text-sm font-semibold">Upload successful! Here is your raid URL:</p>
                            <a
                                href={routePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-600 hover:text-violet-800 break-all"
                            >
                                {window.location.origin}{routePath}
                            </a>
                            <p className="text-xs font-semibold">Paste this into the custom iFrame for the Tangia alert</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
